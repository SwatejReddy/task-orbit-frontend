import { selectorFamily } from "recoil";
import { Task, tasksAtom } from "../atoms/tasksAtom";

export const taskSelector = selectorFamily<Task | undefined, string>({
    key: "taskSelector",
    get: (id: string) => ({ get }) => {
        const tasks = get(tasksAtom);
        return tasks.find(task => task.id == parseInt(id));
    }
})