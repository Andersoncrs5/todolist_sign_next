'use client'
import CustomInput from "@/components/CustomInput/CustomInput.component";
import useCreateTask from "./service";
import CustomTextarea from "@/components/CustomTextarea/CustomTextarea.component";
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component";
import Alert from "@/components/alert/alert.component";
import ErrorForm from "@/components/ErrorForm/ErrorForm.component";
import { useRequireAuth } from "@/services/hooks/useRequireAuth";

export default function createNewTask() {
    useRequireAuth()

    const {
        alert,
        description,
        done,
        error,
        handleSubmit,
        isSubmiting,
        messageAlert,
        messageForm,
        setAlert,
        setDescription,
        setDone,
        setError,
        setIsSubmiting,
        setMessageAlert,
        setMessageForm,
        setTitle,
        title
    } = useCreateTask()

    return (
        <div
            className="h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
        >
            {messageForm && <Alert name={messageAlert} /> }
            {alert && <ErrorForm data={error} /> }

            <div className="flex items-center justify-center min-h-screen ">
                <div className="text-center p-2 border rounded w-full max-w-md ">
                    <form onSubmit={handleSubmit} >
                        <CustomInput 
                            onChange={(e) => setTitle(e.target.value)}
                            type={"text"}
                            value={title}
                            nameLabel={"Title:"}
                            placeholder={"Task name"}
                        />
                        <CustomTextarea 
                            onChange={(e) => setDescription(e.target.value) }
                            value={description}
                            nameLabel={"Description"}
                            placeholder={"Task description"}
                        />
                        <BtnSubmit 
                            isSubmitting={isSubmiting}                        
                            padding={"1.5"}
                            more={"mt-1"}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}