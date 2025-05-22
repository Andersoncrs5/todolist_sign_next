'use client'

import useProfile from "./service";
import Alert from "@/components/alert/alert.component";
import BtnFunc from "@/components/btnFunc/btnFunc.component";
import Load from "@/components/Load/load.component";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter()

    const {
        alert,
        load,
        messageAlert,
        setLoad,
        user
    } = useProfile()

    return (
        <div
            className="h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
        >
            {alert && <Alert name={messageAlert} /> }
            
            {load && <Load />}

            { user && 
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="text-center border rounded p-2 w-full max-w-md ">
                        <h2>Email: {user?.email}</h2>
                        <h2>Name: {user?.name}</h2>
                        <div className={"mt-1"} >
                            <BtnFunc name={"Update"} color={"yellow"} onClick={() => router.push('/user/update') } />
                            <BtnFunc name={"See metric"} color={"green"} onClick={function () {
                                console.log()
                            } } />
                            <BtnFunc name={"delete"} color={"red"} onClick={function () {
                                console.log()
                            } } />
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}