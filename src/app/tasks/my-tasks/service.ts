import { useEffect, useState } from "react";
import api from "@/services/api";
import TaskEntity from "@/services/entities/tasks/Task.entity";
import ResponsePagination from "@/services/resposes/ResponsePagination.response";
import { AxiosResponse } from "axios";

export function useTasks(path: string, initialPage = 1) {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [structPagination, setStructPagination] = useState<ResponsePagination<TaskEntity>["meta"]>();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [error, setError] = useState<string>('');
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  async function fetchTasks(page: number) {
    setLoad(true);
    try {
      const response: AxiosResponse<ResponsePagination<TaskEntity>, any> = await api.get<ResponsePagination<TaskEntity>>(`${path}?page=${page}`);

      if (response.status === 200) {
        setTasks(response.data.items);
        setStructPagination(response.data.meta);
      }

    } catch (e: any) {
      if (e.response?.status === 500 || e.response?.status === 401) {
        setError(e.response.data.message);
      }

    } finally {
      setLoad(false);
      disableError();
    }
  }

  async function deleteTask(id: any) {
    try {
      if (!id) {
        setError("Task ID is required.");
        setErrorAlert(true);
        return;
      }

      const response: AxiosResponse<any> = await api.delete(`v1/task/${id}`);

      if (response.status === 200) {
        setError("Task successfully deleted.");
        setErrorAlert(true);
      }
    } catch (e: any) {
      const status = e.response?.status;

      if (status === 400) {
        setError("Invalid request.");
      } 

      if (status === 401) {
        setError("Unauthorized. Please log in again.");
      } 

      if (status === 404) {
        setError("Task not found.");
      } 

      if (status === 500) {
        setError("Internal server error. Please try again later.");
      } 

      if (status) {
        setError("Unexpected error.");
      }

      setErrorAlert(true);
    }
  }

  async function logout(){
    try {
      const response: AxiosResponse<any, any> = await api.get('v1/auth/logout');

      if (response.status === 200) {
        setError("Bye Bye");
        setErrorAlert(true);
        localStorage.clear()
      }

    } catch (e:any) {

      if (e.response.status === 500) {
        setError(e.response.data.message);
      } 

    } finally {
      disableError()
    }
  }

  async function changeStatusTask(id: any) {
    try {
      if (!id) {
        setError("Task ID is required.");
        setErrorAlert(true);
        return;
      }

      const response: AxiosResponse<any> = await api.get(`v1/task/change-status-task/${id}`);

      if (response.status === 200) {
        setError("Task status successfully changed.");
        setErrorAlert(true);
      }
    } catch (e: any) {
      const status = e.response?.status;

      if (status === 400) {
        setError("Invalid request.");
      } 

      if (status === 401) {
        setError("Unauthorized. Please log in again.");
      } 

      if (status === 404) {
        setError("Task not found.");
      } 

      if (status === 500) {
        setError("Internal server error. Please try again later.");
      } 

      if (status) {
        setError("Unexpected error.");
      }

      setErrorAlert(true);
    }
  }

  function disableError() {
    setTimeout(() => {
      setErrorAlert(false);
      setError('');
    }, 5000);
  }

  return {
    tasks,
    structPagination,
    currentPage,
    setCurrentPage,
    error,
    errorAlert,
    load,
    setTasks,
    setStructPagination,
    setError,
    setErrorAlert,
    setLoad,
    deleteTask,
    changeStatusTask,
    logout
  };
}
