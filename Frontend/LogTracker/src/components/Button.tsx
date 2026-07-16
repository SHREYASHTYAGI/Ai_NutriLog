type ButtonProps={
    text:string;
    type?:"button"|"submit";
    loading?:boolean;
};

export default function Button({
    text,
    type="button",
    loading=false,
}:ButtonProps){
    return (
         <button
      type={type}
      disabled={loading}
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
    )
}