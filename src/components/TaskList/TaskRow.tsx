import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react'
import { Task, getStatusColor, getPriorityColor } from './util'

interface TaskRowProps {
    task: Task;
    expanded: boolean;
    onToggleExpand: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function TaskRow({ task, expanded, onToggleExpand, onEdit, onDelete }: TaskRowProps) {
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString()

    return (
        <>
            <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-4">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2 text-gray-500 hover:text-gray-700"
                            onClick={onToggleExpand}
                        >
                            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        <span className="font-medium text-gray-800">{task.title}</span>
                    </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`${getStatusColor(task.status)}`}>
                        {task.status}
                    </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`${getPriorityColor(task.priority)}`}>
                        {task.priority}
                    </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{formattedDueDate}</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm" className="mr-2" onClick={onEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </td>
            </tr>
            {expanded && (
                <tr>
                    <td colSpan={5} className="px-4 py-2 bg-gray-50">
                        <div className="text-sm text-gray-700 p-2">
                            {task.description}
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}