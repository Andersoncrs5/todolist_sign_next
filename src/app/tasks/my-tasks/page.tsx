'use client'
import BtnBasic from "@/components/btn/btnBasic.component";
import Header from "@/components/header/Header.component";
import { useRequireAuth } from "@/services/hooks/useRequireAuth";
import Load from "@/components/Load/load.component";
import ListTasks from "@/components/listTasks/ListTasks.component";
import { useTasks } from "@/services/hooks/tasks/getAllTasks.hook";
import NoContent from "@/components/noContent/NoContent.component";

export default function MyTasks() {
    useRequireAuth()

    const { 
        structPagination, 
        tasks, 
        error, 
        errorAlert, 
        load, 
        setError, 
        setErrorAlert, 
        setStructPagination, 
        setTasks, 
        setLoad 
    } = useTasks("v1/task/my-tasks");

    return (
        <div
            className="h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
        >
            { !load && <Header title={"MyTasks"} children={
                <BtnBasic url={"tasks/create-task"} color={""} name={"CREATE TASK"} padding={"1"}  />
            } /> }
            
            { load && <Load  /> }

            { tasks.length != 0 && <ListTasks tasks={tasks}/> }

            { tasks.length == 0 && <NoContent  /> }      

        </div>
    );
}