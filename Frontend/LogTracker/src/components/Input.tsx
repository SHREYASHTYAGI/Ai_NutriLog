//defining the foramt of props

type InputProps={
    placeholder:string,
    type?:string,
    value:string,
    disabled?:boolean,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
};


export default function Input({
  type = "text",
  placeholder,
  value,
  disabled=false,
  onChange,
}: InputProps) {
  return (
    <input
  type={type}
  placeholder={placeholder}
  value={value}
  disabled={disabled}
  onChange={onChange}
  className="
    w-full
    rounded-xl
    border
    border-slate-700
    bg-slate-800
    px-4
    py-3
    text-white
    placeholder:text-slate-400
    outline-none
    transition-all
    duration-200
    focus:border-emerald-500
    focus:ring-2
    focus:ring-emerald-500/20
  "
/>
  );
}