import { Button } from "@/components/ui/button"
import { ArrowUpDown } from 'lucide-react'
import { Task, SortConfig } from './util'
import { TaskRow } from "./TaskRow"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface TaskTableProps {
    tasks: Task[];
    expandedTask: number | null;
    sortConfig: SortConfig;
    onToggleExpand: (taskId: number) => void;
    onRequestSort: (key: 'status' | 'priority') => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: Task) => void;
}

export function TaskTable({ tasks, expandedTask, sortConfig, onToggleExpand, onRequestSort, onEditTask, onDeleteTask }: TaskTableProps) {
    const getSortIcon = (key: 'status' | 'priority') => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ?
                <ArrowUpIcon className="h-4 w-4 ml-1" /> :
                <ArrowDownIcon className="h-4 w-4 ml-1" />
        }
        return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />
    }

    return (
        <div className="rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Button
                                variant="ghost"
                                onClick={() => onRequestSort('status')}
                                className="flex items-center focus:outline-none"
                            >
                                Status
                                {getSortIcon('status')}
                            </Button>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Button
                                variant="ghost"
                                onClick={() => onRequestSort('priority')}
                                className="flex items-center focus:outline-none"
                            >
                                Priority
                                {getSortIcon('priority')}
                            </Button>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <TaskRow
                            key={task._id}
                            task={task}
                            expanded={expandedTask === task._id}
                            onToggleExpand={() => onToggleExpand(task._id)}
                            onEdit={() => onEditTask(task)}
                            onDelete={() => onDeleteTask(task)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}