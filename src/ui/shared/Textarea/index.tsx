import { ChangeEvent, useState } from "react";
import { TTextarea } from "./textarea.type";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { twMerge } from "tailwind-merge";

const TextArea = ({
  label,
  leading,
  trailing,
  name,
  register,
  error,
  placeholder,
  rows,
  value,
  className,
  isDebounce = true,
  onChange,
  onDebounce,
  ...props
}: TTextarea) => {
  const [innerValue, setInnerValue] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const debouncedValue = useDebounce<string>(innerValue!, 500);

  useUpdateEffect(() => {
    dirty && isDebounce && onDebounce?.(innerValue!);
  }, [debouncedValue]);
  return (
    <div className="w-full mb-2">
      <textarea
        rows={rows}
        aria-label={name}
        id={name}
        {...props}
        {...register?.(name)}
        value={value ?? innerValue ?? ""}
        placeholder={placeholder}
        className={twMerge(
          `border rounded-lg w-full px-4 pt-4 h-full peer text-15px400 resize-none ${
            error && "border-red-500"
          }`,
          className
        )}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          isDebounce && setInnerValue(e.target.value);
          !dirty && setDirty(true);
          // setValue(e.target.value)
          onChange?.(e.target.value);
        }}
      />
      {error && (
        <span role="alert" className="text-error-500 text-14px400">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default TextArea;
