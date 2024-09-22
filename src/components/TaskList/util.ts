import { isBefore, isSameDay } from 'date-fns'

export interface Task {
    _id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
}


export interface Filter {
    status: string;
    priority: string;
    search: string;
    dueDate?: Date;
}

export interface SortConfig {
    key: 'status' | 'priority' | null;
    direction: 'ascending' | 'descending' | null;
}

export const statusOrder = ["To Do", "In Progress", "Completed"]
export const priorityOrder = ["Low", "Medium", "High"]

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'To Do': return 'bg-sky-50 text-sky-700 border-sky-200'
        case 'In Progress': return 'bg-amber-50 text-amber-700 border-amber-200'
        case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
        default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
}

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High': return 'bg-rose-50 text-rose-700 border-rose-200'
        case 'Medium': return 'bg-orange-50 text-orange-700 border-orange-200'
        case 'Low': return 'bg-green-50 text-green-700 border-green-200'
        default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
}

export const filterTasks = (tasks: Task[], filter: Filter, date: Date | undefined) => {
    return tasks.filter(task => {
        const statusCondition = filter.status === 'All Statuses' || filter.status === '' || task.status === filter.status;
        const priorityCondition = filter.priority === 'All Priorities' || filter.priority === '' || task.priority === filter.priority;
        const searchCondition = filter.search === '' || task.title.toLowerCase().includes(filter.search.toLowerCase());

        let dateCondition = true;
        if (date) {
            const taskDate = new Date(task.dueDate);
            dateCondition = isSameDay(taskDate, date) || isBefore(taskDate, date);
        }

        return statusCondition && priorityCondition && searchCondition && dateCondition;
    });
}
export const sortTasks = (tasks: Task[], sortConfig: SortConfig) => {
    if (sortConfig.key !== null) {
        return [...tasks].sort((a, b) => {
            if (sortConfig.key === 'status') {
                return (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) * (sortConfig.direction === 'ascending' ? 1 : -1)
            }
            if (sortConfig.key === 'priority') {
                return (priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)) * (sortConfig.direction === 'ascending' ? 1 : -1)
            }
            return 0
        })
    }
    return tasks
}