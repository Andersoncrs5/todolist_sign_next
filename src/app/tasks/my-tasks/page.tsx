'use client'
import { useEffect, useState } from "react";
import BtnBasic from "@/components/btn/btnBasic.component";
import Header from "@/components/header/Header.component";
import { useRequireAuth } from "@/services/hooks/useRequireAuth";
import Load from "@/components/Load/load.component";
import ListTasks from "@/components/listTasks/showTasks.component";
import NoContent from "@/components/noContent/NoContent.component";
import TaskEntity from "@/services/entities/tasks/Task.entity";
import BtnFunc from "@/components/btnFunc/btnFunc.component";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert/alert.component";
import { useTasks } from "./service";

export default function MyTasks() {
    const router = useRouter();
    useRequireAuth();

    const {
        tasks,
        load,
        setTasks,
        currentPage,
        setCurrentPage,
        structPagination,
        deleteTask,
        error,
        errorAlert,
        setError,
        setErrorAlert,
        setLoad,
        setStructPagination,
        changeStatusTask,
        logout
    } = useTasks("v1/task/my-tasks");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat pb-10"
            style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
        >

            {errorAlert && <Alert name={error} /> }

            {!load && (
                <Header title="MyTasks" childrens={[
                    <BtnBasic key={1} url="tasks/create-task" color="" name="CREATE TASK" padding="1" />,
                    <BtnBasic key={2} url="user/profile" color="" name="PROFILE" padding="1" more="ms-1" />,
                    <BtnFunc key={3} name={"LOGOUT"} more={"ms-1"} color={"white"} onClick={() => logout()} />
                ]} />
            )}

            {load && <Load />}

            {tasks.length !== 0 && (
                <div className="px-4">
                    {tasks.map((e: TaskEntity) => (
                        <ListTasks
                            key={e.id}
                            task={e}
                            children={
                                <BtnFunc
                                    name="Update"
                                    color="yellow"
                                    onClick={() => router.push(`/tasks/${e.id}/update-task`)}
                                />
                            }
                            children2={
                                <BtnFunc
                                    name="Delete"
                                    color="red" onClick={() => deleteTask(e.id) }                                    
                                />
                            }
                            children3={
                                <BtnFunc
                                    name="status"
                                    color="blue" onClick={() => changeStatusTask(e.id) }                                    
                                />
                            }
                        />
                    ))}
                </div>
            )}

            {structPagination && structPagination.totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center mt-6 gap-2 text-white">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="bg-transparent border hover:border-blue-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                    >
                        previous
                    </button>

                    {Array.from({ length: structPagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded font-bold ${
                                page === currentPage
                                    ? "bg-transparent text-white"
                                    : "bg-transparent text-white hover:border-gray"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === structPagination.totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="bg-transparent border hover:border-blue-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {tasks.length === 0 && !load && <NoContent />}
        </div>
    );
}
