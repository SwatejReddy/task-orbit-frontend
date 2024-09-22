import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Task } from './util'

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
    task: Task | null;
}

export function EditTaskModal({ isOpen, onClose, onSave, task }: EditTaskModalProps) {
    const [editedTask, setEditedTask] = useState<Task | null>(null);

    useEffect(() => {
        if (task) {
            setEditedTask({ ...task });
        }
    }, [task]);

    if (!editedTask) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev!, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setEditedTask(prev => ({ ...prev!, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedTask);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Edit Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right font-medium">Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={editedTask.title}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right font-medium">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="status" className="text-right font-medium">Status</label>
                        <Select
                            onValueChange={(value) => handleSelectChange('status', value)}
                            defaultValue={editedTask.status}
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
                            defaultValue={editedTask.priority}
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
                            value={editedTask.dueDate}
                            onChange={handleChange}
                            className="col-span-3 bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}