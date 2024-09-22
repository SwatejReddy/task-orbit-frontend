'use client';

import { useEffect } from "react";
import TaskList from "@/components/TaskList/TaskList";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../atoms/tasksAtom";
import Navbar from "@/components/Navbar";

export default function TaskPage() {
    const [tasks, setTasks] = useRecoilState(tasksAtom);
    console.log("Task Atom from tasks: ", tasks);


    useEffect(() => {
        async function getTasks() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/task/view/all`, {
                    withCredentials: true,
                });
                setTasks(res.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getTasks();
    }, [])

    useEffect(() => {
        console.log("Tasks: ", tasks);
    }, [tasks])

    return (
        <div>
            <Navbar />
            <TaskList />
        </div>
    );
}