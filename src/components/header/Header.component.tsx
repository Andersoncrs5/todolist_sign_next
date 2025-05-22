import { ReactNode } from "react";
import Types from "./types";

export default function Header(props: Types) {
    return (
        <div className={"flex bg-transparent flex-wrap border p-2"} >
            <div className="w-2/10">
                <h1>{props.title}</h1>
            </div>
            <div className="w-4/10"></div>
            <div className="w-4/10 text-center ">
                {props.childrens.length != 0 && 
                    props.childrens.map((e: ReactNode) => {
                        return e
                    })
                }
            </div>
        </div>
    );
}