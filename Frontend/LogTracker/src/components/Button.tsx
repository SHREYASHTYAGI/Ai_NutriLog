type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  text,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "w-full rounded-2xl py-3 font-semibold text-white transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "secondary"
      ? "bg-white/5 border border-white/10 text-white hover:border-orange-400/50 hover:bg-white/10"
      : "bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 shadow-[0_20px_40px_rgba(255,107,53,0.24)] hover:scale-[1.01]";

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}