import { handleError } from "@/app/helpers/handleError";
import type { InputType } from "./input.type";
import { InputVM } from "./input.vm";
import { twMerge } from "tailwind-merge";

const Input = ({
  label,
  leading,
  trailing,
  name,
  type,
  isDebounce = false,
  placeholder,
  onChange,
  onDebounce,
  inputClassName,
  inputLabelclassName,
  className,
  labelClassName,
  ...props
}: InputType) => {
  const { reg, hasMethods, methods, keyDownHandler, changeHandler } = InputVM({
    name,
    type,
    isDebounce,
    onDebounce,
    onChange,
  });

  return (
    <div className={twMerge("w-full", className)}>
      <div
        className={twMerge([
          `relative flex items-center gap-x-4 px-4 border h-11 focus-within:border-[#D2AB67] border-solid rounded-lg ${
            props?.disabled ? "bg-[#F5F5F5]" : "bg-[#F5F5F5]"
          }` ,
          hasMethods && handleError(name, methods)
            ? "!border-red-500"
            : "border-gray-200", 
        ].join(" "), inputLabelclassName)}
      >
        {leading}
        <div className="relative h-full flex-grow">
          <input
            aria-label={name}
            id={name}
            type={type}
            placeholder={label ? " " : placeholder}
            className={twMerge([
              "w-full h-full peer text-15px400 bg-[#F5F5F5]",
              label ? "pt-3" : "",
            ].join(" "), inputClassName)}
            onKeyDown={keyDownHandler}
            onChange={changeHandler}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            {...props}
            {...reg}
          />

            {label && (
            <label
              htmlFor={name}
              className={twMerge(
                "text-[14px] absolute text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-[10px] -left-0.5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2  peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[10px] peer-focus:scale-75",
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>
        {trailing}
      </div>
      {hasMethods && handleError(name, methods) ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
