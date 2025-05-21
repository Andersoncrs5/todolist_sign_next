import Types from './types'
import { LuRocket } from "react-icons/lu";
import { BsRocket } from "react-icons/bs";

export default function BtnSubmit(props: Types) {
    return (
        <div className={"flex justify-between items-center"} >
            <button 
                type="submit"
                disabled={props.isSubmitting}
                className={`flex ${props.more} items-center gap-2 bg-transparent border text-white px-2 py-1 rounded 
                ${props.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border'}`}
            >
                {props.isSubmitting ? (
                    <>
                        {/* <svg 
                            className="animate-spin h-5 w-5 text-white" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" cy="12" r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            ></circle>
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg> */}
                        <LuRocket />
                    </>
                ) : (
                    <BsRocket />
                )}
            </button>
            {props.children}
        </div>
        
    );
}