import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, PlusCircle, X } from 'lucide-react'
import { format } from 'date-fns'
import { Filter } from "./util"

interface TaskFiltersProps {
    filter: Filter;
    setFilter: (filter: Filter) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    onAddNewTask: () => void;
}

export function TaskFilters({ filter, setFilter, date, setDate, onAddNewTask }: TaskFiltersProps) {
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            setFilter({ ...filter, dueDate: selectedDate });
        } else {
            const { dueDate, ...restFilter } = filter;
            setFilter(restFilter);
        }
    };

    const clearDateFilter = () => {
        setDate(undefined);
        const { dueDate, ...restFilter } = filter;
        setFilter(restFilter);
    };

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
            <div className="w-full sm:flex-1 min-w-[200px]">
                <Input
                    placeholder="Search tasks..."
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    className="w-full"
                />
            </div>
            <Select
                value={filter.status || "all"}
                onValueChange={(value) => setFilter({ ...filter, status: value === "all" ? "" : value })}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={filter.priority || "all"}
                onValueChange={(value) => setFilter({ ...filter, priority: value === "all" ? "" : value })}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex w-full sm:w-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-[180px] justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? `Before ${format(date, 'PP')}` : <span>Filter by due date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {date && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={clearDateFilter}
                        aria-label="Clear date filter"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white" onClick={onAddNewTask}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
            </Button>
        </div>
    )
}