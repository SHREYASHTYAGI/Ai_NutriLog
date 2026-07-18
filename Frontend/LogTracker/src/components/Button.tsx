type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  loading?: boolean; // (?) -> means optional btw...
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; //added this feature so that there i can pass optional click handler
};

export default function Button({
  text,
  type = "button",
  loading = false,
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className="
        w-full
        rounded-xl
        bg-emerald-500
        py-3
        font-semibold
        text-white
        transition
        duration-200
        hover:bg-emerald-600
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}