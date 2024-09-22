'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList/TaskList";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../atoms/tasksAtom";
import Navbar from "@/components/Navbar";

export default function TaskPage() {
    const router = useRouter();
    const [tasks, setTasks] = useRecoilState(tasksAtom);

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

    // Redirect logic is handled by ProtectedRoute, so we can simplify this
    return (
        <div>
            <Navbar />
            <TaskList />
        </div>
    );
}