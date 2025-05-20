import Link from "next/link";
import { clsx } from "clsx";
import Types from './typeBtn';

export default function Btn(props: Types) {
  const bg = `bg-${String(props.color)}`;
  const hover: string = `hover:bg-${props.colorHover||'white'} hover:text-${props.colorTextHover||'black'}`;
  const padding = `p-${String(props.padding||1)}`;

  return (
    <Link
      href={`/${props.url}`}
      className={clsx(bg, hover, " border rounded pe-3 ps-3 ", padding, props.more)}
    >
      {props.name}
    </Link>
  );
}