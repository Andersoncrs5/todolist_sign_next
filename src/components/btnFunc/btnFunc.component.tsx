import { clsx } from "clsx";
import Types from './typesBtn'

export default function BtnFunc(props: Types) {
  const bg: string = `border border-${props.color || 'white' } bg-transparent`;
  const hover: string = `hover:bg-white hover:text-black`;
  const padding: string = `p-${props.padding||1}`;

  return (
    <button
      onClick={props.onClick}
      className={clsx(
        bg,
        hover,
        "rounded pe-3 ps-3",
        padding,
        props.more
      )}
    >
      {props.name}
    </button>
  );
}