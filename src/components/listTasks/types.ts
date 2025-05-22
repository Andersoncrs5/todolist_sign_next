import TaskEntity from "@/services/entities/tasks/Task.entity";
import { ReactNode } from "react";

export interface Types {
    task: TaskEntity
    children?: ReactNode
    children2?: ReactNode
    children3?: ReactNode
    
}