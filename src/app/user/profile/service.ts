'use client'

import api from "@/services/api";
import User from "@/services/entities/user/User.entity";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function useProfile() {
    const router = useRouter()

    const [load, setLoad] = useState<boolean>(false);
    const [user, setUser] = useState<User>()

    const [messageAlert, setMessageAlert] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)

    useEffect(()=> {
        getProfile()
    }, [])

    async function getProfile() {
        setLoad(true);
        try {
            const response: AxiosResponse<any, any> = await api.get<User>('v1/user');
            console.log(response)
            if (response.status === 200) {
                setUser(response.data)
            }

        } catch (e: any) {
            console.log(e)
            if (e.response.status === 404) {
                setMessageAlert(e.response.data.message || 'User not found' )
                setAlert(true)
                redirectBack()
            }

            if (e.response.status === 401) {
                router.push('/auth/login')
            }

            if (e.response.status === 500) {
                setMessageAlert(e.response.data.message || 'Error internal in server. Please try again later' )
                setAlert(true)
                redirectBack()
            }

        } finally {
            setLoad(false);
            disableAlert()
            setMessageAlert('')
        }
    }

    function disableAlert(time?: number) {
        setTimeout(() => {
            setAlert(false)
        }, time || 5000 );
    } 

    function redirectBack(time? : number) {
        setTimeout(() => {
            router.back();
        }, time || 4000);
    }

    return {
        getProfile,
        load,
        setLoad,
        user,
        messageAlert,
        alert
    }
}