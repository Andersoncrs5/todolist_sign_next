import Types from "./types";

export default function Header(props: Types) {
    return (
        <div className={"flex bg-transparent flex-wrap border p-2"} >
            <div className="w-2/10">
                <h1>{props.title}</h1>
            </div>
            <div className="w-6/10"></div>
            <div className="w-2/10 text-center ">
                {props.children}
            </div>
        </div>
    );
}