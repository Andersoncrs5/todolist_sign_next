import api from "@/services/api";
import TaskEntity from "@/services/entities/tasks/Task.entity";
import { AxiosResponse } from "axios";

export async function getOneTask(id: string): Promise<TaskEntity | null> {
    try {
        const response: AxiosResponse<any, any> = await api.get('v1/task/' + id);
        return response.status === 200 ? response.data : null;
    } catch (e: any) {
        if (e.response?.status === 404) return null;
        throw e;
    }
}