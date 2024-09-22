import { Task } from "@/components/TaskList/util";
import { atom } from "recoil";

export const tasksAtom = atom<Task[]>({
    key: "tasksAtom",
    default: []
})
