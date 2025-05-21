import TaskEntity from "@/services/entities/tasks/Task.entity";
import { Types } from "./types";
import BtnFunc from "../btnFunc/btnFunc.component";
import { deleteTask } from "@/app/tasks/my-tasks/service";

export default function ListTasks(props: Types) {
    return (
        <div>
            {
                props.tasks.map((task: TaskEntity) => {
                    return (
                        <div key={task.id} className="w-[85%] mt-1.5 p-1.5 mx-auto flex flex-wrap border rounded bg-transparent mb-2">
                            <div className="w-3/12 text-center ">
                                <p>{task.title}</p>
                            </div>
                            <div className="w-4/12 text-center ">
                                <p>{task.description}</p>
                            </div>
                            <div className="w-3/12 flex gap-2 text-center ">
                                <BtnFunc name={"Delete"} padding={"1"} color={"red"} onClick={() => deleteTask(task.id)} />
                            </div>
                        </div>  
                    )      
                })
            }
        </div>
    );
}
