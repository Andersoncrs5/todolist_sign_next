import { useEffect, useState } from "react";
import api from "@/services/api";
import TaskEntity from "@/services/entities/tasks/Task.entity";
import ResponsePagination from "@/services/resposes/ResponsePagination.response";

export function useTasks(path: string ) {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [structPagination, setStructPagination] = useState<ResponsePagination<TaskEntity>["meta"]>();

  const [error, setError] = useState<string>('');
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
        const response = await api.get<ResponsePagination<TaskEntity>>(path);

        if (response.status === 200) {
            setTasks(response.data.items);
            setStructPagination(response.data.meta);
        }

    } catch (e: any) {
        if (e.response.status === 500) {
            setError(e.response.data.message)
        }

        if (e.response.status === 401) {
            setError(e.response.data.message)
        }

    } finally {
        setLoad(false)
        disableError()
    }
  }

  function disableError() {
    setTimeout(() => {
      setErrorAlert(false)
      setError('')
    }, 5000);
  }

  return {
    tasks,
    structPagination,
    error,
    errorAlert,
    load,
    setTasks,
    setStructPagination,
    setError,
    setErrorAlert,
    setLoad
  };
}
