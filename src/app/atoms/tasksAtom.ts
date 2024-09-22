import { Task } from "@/components/TaskList/util";
import { atom } from "recoil";

// export interface Task {
//     _id: string,
//     title: string,
//     description: string,
//     status: string,
//     priority: string,
//     dueDate: string,
// }
export const tasksAtom = atom<Task[]>({
    key: "tasksAtom",
    default: []
})
