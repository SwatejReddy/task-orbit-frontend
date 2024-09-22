import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react'
import { Task, getStatusColor, getPriorityColor } from './util'
import { useRecoilValue } from "recoil"
import { taskSelector } from "@/app/selectors/taskSelector"

interface TaskCardProps {
    task: Task;
    expanded: boolean;
    onToggleExpand: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function TaskCard({ task, expanded, onToggleExpand, onEdit, onDelete }: TaskCardProps) {
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString()
    if (!task) return null
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold mr-2 text-gray-800">{task.title}</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 text-gray-500 hover:text-gray-700"
                        onClick={onToggleExpand}
                    >
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${getStatusColor(task.status)} text-xs`}>
                        {task.status}
                    </Badge>
                    <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs`}>
                        {task.priority}
                    </Badge>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formattedDueDate}
                </div>
                {expanded && (
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        {task.description}
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={onEdit}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8 px-2 text-xs" onClick={onDelete}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}