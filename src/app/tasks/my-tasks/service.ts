import api from "@/services/api";
import { AxiosResponse } from "axios";

export async function deleteTask(id: number): Promise<any> {
    try {
        if (!id) {
            return;
        }

        const response: AxiosResponse<any, any> = await api.post('v1/task/' + id);

        if (response.status === 200) {

        }

    } catch (e: any) {
        if (e.response.status === 400) {
            
        }

        if (e.response.status === 401) {
            
        }

        if (e.response.status === 404) {
            
        }

        if (e.response.status === 500) {
            
        }

    }
}

export async function updateTask(id: number) {
    try {
        if (!id) {
            return;
        }

        const response: AxiosResponse<any, any> = await api.post('v1/task/' + id);

        if (response.status === 200) {

        }

    } catch (e: any) {
        if (e.response.status === 400) {
            
        }

        if (e.response.status === 401) {
            
        }

        if (e.response.status === 404) {
            
        }

        if (e.response.status === 500) {
            
        }

    }
}