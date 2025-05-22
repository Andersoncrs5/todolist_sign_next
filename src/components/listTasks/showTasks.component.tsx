import { Types } from "./types";

export default function ListTasks(props: Types) {
    return (
        <div>
            <div key={props.task.id} className="w-[85%] mt-1.5 p-1.5 mx-auto flex flex-wrap border rounded bg-transparent mb-2">
                <div className="w-3/12 text-center ">
                    <p>{props.task.title}</p>
                </div>
                <div className="w-4/12 text-center ">
                    <p>{props.task.description}</p>
                </div>
                <div className="w-2/12 text-center ">
                    <p>{props.task.done ? 'true' : 'false' }</p>
                </div>
                <div className="w-3/12 flex gap-2 text-center ">
                    {props.children}
                    {props.children2}
                    {props.children3}
                </div>
            </div>  
        </div>
    );
}
