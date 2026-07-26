type InputProps = {
  placeholder: string;
  type?: string;
  value: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  disabled = false,
  id,
  name,
  className = "",
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={
        `w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 transition duration-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 backdrop-blur-sm ${className}`
      }
    />
  );
}