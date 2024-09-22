import { selectorFamily } from "recoil";
import { tasksAtom } from "../atoms/tasksAtom";
import { Task } from "@/components/TaskList/util";



export const taskSelector = selectorFamily<Task | undefined, string>({
    key: "taskSelector",
    get: (id: string) => ({ get }) => {
        const tasks = get(tasksAtom);
        return tasks.find(task => task._id == Number(id));
    }
})