'use client'

import { useState, useMemo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tasksAtom } from '@/app/atoms/tasksAtom'
import { filterTasks, sortTasks, Task } from './util'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { TaskTable } from './TaskTable'
import { TaskFilters } from './TaskFilters'
import { EditTaskModal } from './EditTaskModal'
import { DeleteConfirmationModal } from './DeleteConfirmationModel'
import { AddTaskModal } from './AddTaskModal'
import axios from 'axios'

interface Filter {
    status: string;
    priority: string;
    search: string;
}

interface SortConfig {
    key: 'status' | 'priority' | null;
    direction: 'ascending' | 'descending' | null;
}

export default function TaskList() {
    const tasks = useRecoilValue<Task[]>(tasksAtom);
    const setTasks = useSetRecoilState(tasksAtom);
    const [filter, setFilter] = useState<Filter>({ status: '', priority: '', search: '' })
    const [date, setDate] = useState<Date>()
    const [expandedTask, setExpandedTask] = useState<number | null>(null)
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null })
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);
    const [isAddingTask, setIsAddingTask] = useState(false);

    const filteredTasks = useMemo(() => filterTasks(tasks, filter, date), [tasks, filter, date])
    const sortedTasks = useMemo(() => sortTasks(filteredTasks, sortConfig), [filteredTasks, sortConfig])

    const toggleTaskExpansion = (taskId: number) => {
        setExpandedTask(expandedTask === taskId ? null : taskId)
    }

    const requestSort = (key: 'status' | 'priority') => {
        let direction: 'ascending' | 'descending' | null = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = null;
        }
        setSortConfig({ key: direction ? key : null, direction });
    }

    const handleAddNewTask = () => {
        setIsAddingTask(true);
    }

    const handleSaveNewTask = async (newTask: Omit<Task, '_id'>) => {
        // Optimistic update
        const tempId = Date.now(); // Use a temporary ID for optimistic update
        const tempTask = { ...newTask, _id: tempId };
        setTasks(prevTasks => [...prevTasks, tempTask]);

        try {
            // Send request to backend
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/task/new`,
                newTask,
                {
                    withCredentials: true,
                }
            );

            if (response.data.statusCode != 200) {
                throw new Error('Failed to create task');
            }

            const createdTask = response.data.data;

            // Update with server response
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === tempId ? createdTask : task
                )
            );
        } catch (error) {
            console.error('Error creating task:', error);
            // Revert optimistic update on error
            setTasks(prevTasks => prevTasks.filter(task => task._id !== tempId));
            // Show error message to user
            alert('Failed to create task. Please try again.');
        }
    }

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    }

    const handleSaveTask = async (updatedTask: Task) => {
        // Optimistic update
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );

        try {
            // Send request to backend
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/task/edit/${updatedTask._id}`,
                { ...updatedTask },
                {
                    withCredentials: true,
                }
            );

            if (response.data.statusCode != 200) {
                throw new Error('Failed to update task');
            }

            const updatedTaskFromServer = response.data.data;

            // Update with server response
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === updatedTaskFromServer._id ? updatedTaskFromServer : task
                )
            );
        } catch (error) {
            console.error('Error updating task:', error);
            // Revert optimistic update on error
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === updatedTask._id ? tasks.find(t => t._id === updatedTask._id)! : task
                )
            );
            // Show error message to user
            alert('Failed to update task. Please try again.');
        }
    }

    const handleDeleteTask = (task: Task) => {
        setDeletingTask(task);
    }

    const confirmDeleteTask = async () => {
        if (!deletingTask) return;

        // Optimistic update
        setTasks(prevTasks => prevTasks.filter(task => task._id !== deletingTask._id));

        try {
            // Send request to backend
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/task/delete/${deletingTask._id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.data.statusCode != 200) {
                throw new Error('Failed to delete task');
            }

            // Task successfully deleted, close the modal
            setDeletingTask(null);
        } catch (error) {
            console.error('Error deleting task:', error);
            // Revert optimistic update on error
            setTasks(prevTasks => [...prevTasks, deletingTask]);
            // Show error message to user
            alert('Failed to delete task. Please try again.');
            // Close the modal
            setDeletingTask(null);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Task Management</h1>

                    <TaskFilters
                        filter={filter}
                        setFilter={setFilter}
                        date={date}
                        setDate={setDate}
                        onAddNewTask={handleAddNewTask}
                    />

                    {/* Mobile view */}
                    <div className="md:hidden space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Tasks</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Sort
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => requestSort('status')}>
                                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />)}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => requestSort('priority')}>
                                        Priority {sortConfig.key === 'priority' && (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />)}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {sortedTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                expanded={expandedTask === task._id}
                                onToggleExpand={() => toggleTaskExpansion(task._id)}
                                onEdit={() => handleEditTask(task)}
                                onDelete={() => handleDeleteTask(task)}
                            />
                        ))}
                    </div>

                    {/* Desktop view */}
                    <div className="hidden md:block">
                        <TaskTable
                            tasks={sortedTasks}
                            expandedTask={expandedTask}
                            sortConfig={sortConfig}
                            onToggleExpand={toggleTaskExpansion}
                            onRequestSort={requestSort}
                            onEditTask={handleEditTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    </div>

                    <EditTaskModal
                        isOpen={!!editingTask}
                        onClose={() => setEditingTask(null)}
                        onSave={handleSaveTask}
                        task={editingTask}
                    />

                    <DeleteConfirmationModal
                        isOpen={!!deletingTask}
                        onClose={() => setDeletingTask(null)}
                        onConfirm={confirmDeleteTask}
                        taskTitle={deletingTask?.title || ''}
                    />

                    <AddTaskModal
                        isOpen={isAddingTask}
                        onClose={() => setIsAddingTask(false)}
                        onSave={handleSaveNewTask}
                    />
                </div>
            </div>
        </div>
    )
}