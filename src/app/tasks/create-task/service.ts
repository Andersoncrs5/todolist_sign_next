'use client'
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { useState } from "react"
import CreateTaskDto from "./CreateTaskDto.dto";
import { useRouter } from "next/navigation";

export default function useCreateTask() {
    const router = useRouter();

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);

    const [error, setError] = useState<string[]>([]);
    const [alert, setAlert] = useState<boolean>(false);

    const [messageAlert, setMessageAlert] = useState<string>('');
    const [messageForm, setMessageForm] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmiting(true);

        const dto : CreateTaskDto = {
            title,
            description,
            done,
        }

        try {
            const response: AxiosResponse<any, any> = await api.post('v1/task', dto);
            if (response.status === 200) {
                setMessageForm(true)
                setMessageAlert('Task created with success')
                
                setTimeout(() => {
                    router.push('/tasks/my-tasks')
                }, 5000);
            }

        } catch (error: any) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 400) {
                    setError(data);
                    setAlert(true);
                } else if (status === 404 || status >= 500) {
                    setMessageForm(true);
                    setMessageAlert(data.message);
                }
            } else {
                console.log("Error:", error);
                setMessageForm(true);
                setMessageAlert("Error internal in serve! please try again later");
            }
        } finally {
            setIsSubmiting(true);
            clearInputs()
            disableAlert()
            disableMessageForm()
        }
    }

    function clearInputs() {
        setDescription('')
        setTitle('')
        setDone(false)
    }

    function disableAlert() {
        setTimeout(() => {
            setAlert(false)
        }, 5000)
    }

    function disableMessageForm() {
        setTimeout(() => {
            setMessageForm(false)
        }, 5000)
    }

    return {
        isSubmiting,
        description,
        title,
        error,
        done,
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