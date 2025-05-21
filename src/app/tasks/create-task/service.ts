import api from "@/services/api";
import { useState } from "react"

export default function useCreateTask() {

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmiting(true);

        try {
            const response = await api.post('v1/task/create-task')
        } catch (e: any) {

        } finally {
            setIsSubmiting(true);
        }

    }

    return {
        isSubmiting,
        content,
        title,
        setTitle,
        setContent,
        setIsSubmiting
    }

}