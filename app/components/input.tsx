import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import classes from "../utils/classes";

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    register: UseFormRegister<T>,
    error: FieldError | undefined,
    options?: RegisterOptions<T, Path<T>>,
    grow?: boolean,
    name: Path<T>
}

const Input = <T extends FieldValues,>({ label, register, grow, options, error, name, className, ...props }: InputProps<T>) => {
    return (
        <div className={classes("flex flex-col items-stretch", grow ? "flex-1": "")}>
            <label htmlFor={label} className="font-inter text-xs uppercase font-bold tracking-widest text-gray-400">{label}</label>
            <input
                id={label}
                {...props}
                {...register(name, options ?? {})}
                className={
                    classes(
                        className ?? "",
                        "border-b outline-none border-b-blue-100 font-inter bg-transparent fill-none",
                        "py-[10px] w-full",
                        "focus:border-b-green-700",
                        error ? "!border-b-red-600" : ""
                    )
                }
            />
            {error && <small className="font-inter text-red-600">{error.message}</small>}
        </div>
    )
}

export default Input;