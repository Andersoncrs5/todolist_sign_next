import Types from "./types";

export default function NoContent({ name } : Types ) {
    return (
        <div
        >
            <div className="flex items-center justify-center min-h-screen ">
                <div className="text-center w-full max-w-md ">
                    <h1> {name || 'No Content'} </h1>
                </div>
            </div>
        </div>
        
    );
}