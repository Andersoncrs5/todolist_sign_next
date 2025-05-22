'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import UpdateTaskDto from "./UpdateTaskDto.dto";
import { AxiosResponse } from "axios";
import { getOneTask } from "@/services/hooks/tasks/getOneTask.hook";

export default function useUpdateTask() {
    const { id } = useParams();
    const router = useRouter();

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [done, setDone] = useState(false);

    const [error, setError] = useState<string[]>([]);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [messageForm, setMessageForm] = useState(false);

    useEffect(() => {
        async function fetchTask() {
            const task = await getOneTask(id as string);
            
            if (!task) {
                setMessageForm(true);
                setMessageAlert("Task not found.");
                return;
            }

            setTitle(task.title);
            setDescription(task.description);
            setDone(task.done);
        }
        
        if (id) {
            fetchTask();
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmiting(true);

        const taskId = id as string
        const dto: UpdateTaskDto = { title, description, done };

        try {
            const response: AxiosResponse<any, any> = await api.put(`v1/task/${taskId}`, dto);
            console.log(response)

            if (response.status === 200) {
                setMessageForm(true);
                setMessageAlert('Task updated with success!');
                return redirect();
            }

        } catch (e: any) {
            console.log(e)
            if (e.response?.status === 404) {
                setMessageForm(true);
                setMessageAlert(e.response.data.message || 'Task not found');
            }

            if (e.response?.status === 500) {
                setMessageForm(true);
                setMessageAlert(e.response.data.message || 'Internal server error');
                return redirect();
            }
        } finally {
            setIsSubmiting(false);
            disableAlert();
            disableMessageForm();
            clearInputs()
        }
    }

    function clearInputs(){
        setTitle('')
        setDescription('')
    }

    function redirect() {
        setTimeout(() => {
            router.push('/tasks/my-tasks');
        }, 3000);
    }

    function disableAlert() {
        setTimeout(() => setAlert(false), 3000);
    }

    function disableMessageForm() {
        setTimeout(() => setMessageForm(false), 3000);
    }

    return {
        isSubmiting,
        description,
        title,
        done,
        error,
        alert,
        messageAlert,
        messageForm,
        setAlert,
        setError,
        setDone,
        setTitle,
        setDescription,
        setIsSubmiting,
        setMessageAlert,
        setMessageForm,
        handleSubmit
    }
}
