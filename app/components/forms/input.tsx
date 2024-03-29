import { UseFormRegisterReturn } from "react-hook-form";
interface InputProps {
  [key: string]: any;
  register?: UseFormRegisterReturn;
  name?: string;
  required: boolean;
  type: "text" | "email" | "password" | "phone" | "number" | "textarea";
  placeholder?: string;
  errorMessage?: string | null;
  addClass?: string;
}

export default function Input({
  type,
  register,
  required,
  name,
  placeholder,
  errorMessage,
  addClass,
  ...rest
}: InputProps) {
  return (
    <div className="w-full flex flex-col group relative">
      {type != "textarea" ? (
        <input
          {...rest}
          required={required}
          {...register}
          placeholder={placeholder}
          type={type}
          className={`peer w-full border border-stone-400 px-3 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:ring-2 focus:ring-amber-800 ${addClass}`}
        />
      ) : (
        <textarea
          {...rest}
          {...register}
          placeholder={placeholder}
          required={required}
          className={`peer w-full border border-stone-400 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-amber-800 ${addClass}`}
        ></textarea>
      )}
      {errorMessage && (
        <p className="text-[12px] text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
