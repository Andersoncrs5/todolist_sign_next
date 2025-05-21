import { useState } from "react";
import api from "@/services/api";
import LoginUserDto from "./LoginUserDto.dto";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router: AppRouterInstance = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string[]>([]);
  const [alert, setAlert] = useState<boolean>(false);

  const [messageAlert, setMessageAlert] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const data: LoginUserDto = {
      email,
      password
    }

    try {
      const response: AxiosResponse<any, any> = await api.post('v1/auth/login', data) 

      if (response.status === 200) {
        localStorage.setItem('token' , String(response.data.access_token))
        localStorage.setItem('refresh_token' , String(response.data.access_refresh_token))
        localStorage.setItem('expireAtAccessToken', String(response.data.expireAtAccessToken))
        localStorage.setItem('expireAtRefreshToken', String(response.data.expireAtRefreshToken))

        router.push('/tasks/my-tasks')
      }

    } catch (e: any) {
      
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
      setIsSubmitting(false);
      clearInputs()
    }
  }

  async function disableAlert() {
      setTimeout(() => {
          setAlert(false)
      }, 5000)
  }

  async function clearInputs() {
      setEmail('')
      setPassword('')
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isSubmitting,
    error,
    alert,
    messageAlert
  };
}
