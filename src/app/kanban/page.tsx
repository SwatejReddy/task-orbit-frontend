"use client";

import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksAtom } from "../atoms/tasksAtom";
import { Task } from "@/components/TaskList/util";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = ["To Do", "In Progress", "Completed"];

export default function KanbanBoard() {
    const initialTasks = useRecoilValue(tasksAtom);
    const setTasksAtom = useSetRecoilState(tasksAtom);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const moveTask = async (taskId: number, newStatus: string) => {
        const updatedTasks = tasks.map(task =>
            task._id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        setTasksAtom(updatedTasks);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/task/edit/${taskId}`,
                { status: newStatus },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error updating task status:", error);
            // Revert changes if the API call fails
            setTasks(tasks);
            setTasksAtom(tasks);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "text-red-500";
            case "Medium":
                return "text-yellow-500";
            case "Low":
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {columns.map(column => (
                        <div key={column} className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">{column}</h2>
                            {tasks.filter(task => task.status === column).map(task => (
                                <Card key={task._id} className="mb-2">
                                    <CardHeader>
                                        <CardTitle className="text-sm">{task.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className={`text-xs ${getPriorityColor(task.priority)}`}>
                                            Priority: {task.priority}
                                        </p>
                                        <div className="flex justify-between mt-2">
                                            {column !== "To Do" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => moveTask(task._id, columns[columns.indexOf(column) - 1])}
                                                >
                                                    ←
                                                </Button>
                                            )}
                                            {column !== "Completed" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => moveTask(task._id, columns[columns.indexOf(column) + 1])}
                                                >
                                                    →
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}