import { clsx } from "clsx";
import Types from './typesBtn'

export default function BtnFunc(props: Types) {
  const bg: string = `bg-${props.color}`;
  const hover: string = `hover:bg-${props.colorHover||'white'} hover:text-${props.colorTextHover||'black'}`;
  const padding: string = `p-${props.padding||1}`;

  return (
    <button
      onClick={props.onClick}
      className={clsx(
        bg,
        hover,
        "border rounded pe-3 ps-3",
        padding,
        props.more
      )}
    >
      {props.name}
    </button>
  );
}