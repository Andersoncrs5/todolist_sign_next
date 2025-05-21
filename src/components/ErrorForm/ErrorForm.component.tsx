import Types from "./types";

export default function ErrorForm(props: Types) {
    return (
        <div 
           style={{
            position: 'absolute',
            top: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
          }} 
          className={"bg-transparent p-1.5 border rounded w-[98%] "} >
            {
                props.data.map((e, i) => {
                    return (
                        <small className={"block text-red-600 "} key={i} >{e}</small>
                    );
                })
            }
        </div>
    );
}