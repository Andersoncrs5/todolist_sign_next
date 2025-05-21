'use client'
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component";
import CustomInput from "@/components/CustomInput/CustomInput.component";
import { useState } from "react";
import { useLogin } from "./service";
import Alert from "@/components/alert/alert.component";
import ErrorForm from "@/components/ErrorForm/ErrorForm.component";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isSubmitting,
    alert,
    error,
    messageAlert
  } = useLogin();

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
    >

      {alert && <Alert name={messageAlert} /> }
      {alert && <ErrorForm data={error} /> }

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center shadow-md w-60%">
          <form onSubmit={handleSubmit}>
            <div className="p-3 border rounded">
              <CustomInput
                value={email}
                nameLabel={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder={"abc@gmail.com"}
              />
              <CustomInput
                value={password}
                nameLabel={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                placeholder={"12345678"}
              />
              <BtnSubmit isSubmitting={isSubmitting} more="mt-2" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}