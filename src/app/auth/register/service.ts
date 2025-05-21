'use client'
import api from "@/services/api";
import React from "react";
import { useState } from "react";
import CreateUserDto from "./CreateUserDto.dto";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useRegister() {
    const router: AppRouterInstance = useRouter();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState<string[]>([]);
    const [alert, setAlert] = useState<boolean>(false);

    const [messageAlert, setMessageAlert] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)
        
        const userDto:CreateUserDto = { 
            email,
            name,
            password
        }

        try {
            const response: AxiosResponse<any, any> = await api.post('v1/auth/register', userDto)

            if (response.status === 201) {
                localStorage.setItem('token' , String(response.data.access_token))
                localStorage.setItem('refresh_token' , String(response.data.access_refresh_token))
                localStorage.setItem('expireAtAccessToken', String(response.data.expireAtAccessToken))
                localStorage.setItem('expireAtRefreshToken', String(response.data.expireAtRefreshToken))

                router.push('/tasks/my-tasks')
            }

        } catch (e: any) {

            if (e.response.status === 409) {
                setMessageAlert(e.response.data)
            }

            if(e.reponse.status === 400) {
                setError(e.response.data.message)
                setAlert(true);
                await disableAlert()
            }

            if (e.response.status == 500) {
                setMessageAlert(e.response.data)
                setAlert(true);
                await disableAlert()
            }

        } finally {
            setIsSubmitting(false)
            await clearInputs()
        }
    }

    async function disableAlert() {
        setTimeout(() => {
            setAlert(false)
        }, 5000)
    }

    async function clearInputs() {
        setName('')
        setEmail('')
        setPassword('')
    }

    return  {
        error,
        name,
        email,
        alert,
        password,
        isSubmitting,
        messageAlert,
        setMessageAlert,
        setAlert,
        setName,
        setEmail,
        setError,
        setPassword,
        handleSubmit,

    }
}