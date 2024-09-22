import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Task } from './util'

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newTask: Omit<Task, '_id'>) => void;
}

export function AddTaskModal({ isOpen, onClose, onSave }: AddTaskModalProps) {
    const [newTask, setNewTask] = useState<Omit<Task, '_id'>>({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(newTask);
        onClose();
        setNewTask({
            title: '',
            description: '',
            status: 'To Do',
            priority: 'Medium',
            dueDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Add New Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right font-medium">Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right font-medium">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="status" className="text-right font-medium">Status</label>
                        <Select
                            onValueChange={(value) => handleSelectChange('status', value)}
                            defaultValue={newTask.status}
                        >
                            <SelectTrigger className="col-span-3 bg-gray-50 dark:bg-gray-700">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="To Do">To Do</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="priority" className="text-right font-medium">Priority</label>
                        <Select
                            onValueChange={(value) => handleSelectChange('priority', value)}
                            defaultValue={newTask.priority}
                        >
                            <SelectTrigger className="col-span-3 bg-gray-50 dark:bg-gray-700">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="dueDate" className="text-right font-medium">Due Date</label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={newTask.dueDate}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSave}>Add Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}