import { useState } from "react";
import api from "@/services/api";
import LoginUserDto from "./LoginUserDto.dto";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useRedirectIfAuthenticated } from "@/services/hooks/useRequireAuth";
import ResponseToken from "@/services/resposes/ResponseTokens.response";

export function useLogin() {
  useRedirectIfAuthenticated()
  const router: AppRouterInstance = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string[]>([]);
  const [alert, setAlert] = useState<boolean>(false);

  const [messageAlert, setMessageAlert] = useState<string>('');
  const [messageForm, setMessageForm] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const data: LoginUserDto = {
      email,
      password
    }

    try {
      const response: AxiosResponse<any, any> = await api.post<ResponseToken>('v1/auth/login', data) 
      console.log(response)

      if (response.status === 200) {
        localStorage.setItem('token' , String(response.data.access_token))
        localStorage.setItem('refresh_token' , String(response.data.refresh_token))
        localStorage.setItem('expireAtAccessToken', String(response.data.expireAtAccessToken))
        localStorage.setItem('expireAtRefreshToken', String(response.data.expireAtRefreshToken))

        router.push('/tasks/my-tasks')
      }

    } catch (e: any) {
      console.log(e)

      if(e.response.status === 400) {
        setError(e.response.data.message)
        setMessageForm(true);
        await disableAlert()
      }

      if(e.response.status === 401) {
        setMessageAlert('Login invalid')
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
      await clearInputs()
      await disableMessageForm()
    }
  }

  async function disableAlert() {
    setTimeout(() => {
        setAlert(false)
    }, 5000)
  }

  async function disableMessageForm() {
    setTimeout(() => {
        setMessageForm(false)
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
    setMessageForm,
    isSubmitting,
    messageForm,
    error,
    alert,
    messageAlert
  };
}
