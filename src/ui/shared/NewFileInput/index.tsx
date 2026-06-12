import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import EyeSVG from "@svg/eye.svg?react";
import TrashSVG from "@svg/deleteIcon.svg?react";
import DownloadSVG from "@svg/download.svg?react";
import Button from "../Button";
import axiosInstance from "@/app/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { cn } from "@/app/utils/cn";
import DocumentIcon from "../DocumentIcon";
import { getFileType } from "@/app/helpers/getFileType";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "@/app/helpers/handleError";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value"> & {
  id: number | string;
  name: string;
  test?: string;
  label: string;
  submitRequest?: boolean;
  setDeleteIds?: any;
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>;
  value?: {
    id: number | string;
    name?: string;
    file: File;
  }[];
  deleteFile?: (id: string) => void;
  onchangeFile?: (files: { id: string; name?: string; file: File }[]) => void;
};

const FileInput = ({
  id,
  name,
  test,
  label,
  value,
  submitRequest,
  setDeleteIds,
  onchangeFile,
  deleteFile,
  setUploadLoading,
  ...props
}: Props) => {
  const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  const hasMethods = methods && methods.formState;
  const mainValue = hasMethods ? methods.getValues(name) : value;


  const [files, setFiles] = useState<
    { id: string; name?: string; file: File }[]
  >(mainValue || []);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const abortControllerRef = useRef<AbortController | null>(null);
  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    if (methods) {
      methods.setValue(name, files);
    }
  }, [files, methods, name]);
  const handleDeleteFile = (id: string, name?: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.id.toString() !== id.toString())
    );
    if (name == undefined) {
      fileDelete.mutate(id);
    } else {
      setDeleteIds((prev: any) => [...prev, id]);
    }
    deleteFile?.(id);
    setInputKey((prev) => prev + 1);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: uuidv4(),
        file,
      }));
      setFiles((files) => (files ? [...files, ...newFiles] : newFiles));
      newFiles.forEach((formFile) => {
        const formData = new FormData();
        formData.append("file", formFile.file);
        fileUpload.mutate({ data: formData, file: formFile });
      });
    }
  };
  const fileUpload = useMutation({
    mutationFn: async ({ data, file }: { data: FormData, file: { id: string; file: File; } }) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      return await axiosInstance.post("File/Upload", data, {
        onUploadProgress: (progressEvent) => {
          const totalLoaded = progressEvent.loaded;
          const fileProgress = Math.min(
            100,
            Math.round((totalLoaded / file.file.size) * 100)
          );
          if (progressEvent.loaded < file.file.size) {
            setProgress((prevProgress) => ({
              ...prevProgress,
              [file.id]: fileProgress,
            }));
          } else {
            setProgress((prevProgress) => ({
              ...prevProgress,
              [file.id]: 99,
            }));
          }
        },
        headers: { accept: "multipart/form-data" },
        signal: abortController.signal,
      });
    },
    onError: (_error, variables) => {
      setFiles((prevFiles) =>
        prevFiles.filter((f) => f.id !== variables.file.id)
      );
    },
    onSuccess: (_data, variables) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.map((file) =>
          file.id === variables.file.id
            ? { ...file, id: _data.data.fileToken }
            : file
        );

        if (methods) {
          methods.setValue(name, updatedFiles);
        }
        return updatedFiles;
      });
      onchangeFile?.(files)
    },
    onSettled: () => {
      abortControllerRef.current = null;
    },
  });
  const fileDelete = useMutation({
    mutationFn: (fileId: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return axiosInstance.delete("File/Delete?token=" + fileId);
    },

    onSuccess: (_data, _variables) => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.id.toString() !== _variables.toString())
      );
    },
  });
  useEffect(() => {
    setUploadLoading(fileUpload.isPending);
  }, [fileUpload.isPending, setUploadLoading]);

  return (
    <div className="">
      <div
        className={cn(
          "relative border-b flex items-center justify-between px-4 border h-14 rounded-lg",
          props.disabled ? "bg-gray-100 border-gray-300" : "bg-white",
          hasMethods && handleError(name, methods)
            ? "border-red-500"
            : "border-gray-300 focus-within:border-gray-400"
        )}
      >
        <div className="flex gap-2 items-center">
          <p className="text-gray-500 text-16px400">{label}</p>
        </div>
        <div className="flex">
          <label
            htmlFor={name}
            className={cn(
              "flex justify-center items-center h-10 rounded-md border",
              props.disabled
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50",
              hasMethods && handleError(name, methods)
                ? "bg-error-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            )}
          >
            <div className="text-16px500 flex gap-1 p-4">
              Yüklə
              <DownloadSVG className="h-6" />
            </div>
          </label>
        </div>
        <input
          key={inputKey}
          accept={test}
          multiple
          id={name}
          type="file"
          onChange={handleChangeFile}
          className="absolute inset-0 opacity-0"
          {...props}
        />
      </div>
      <ul
        className={cn(
          "w-full flex flex-col gap-y-3",
          (!!files.length || fileUpload.isPending) && "my-3"
        )}
      >
        {!!files.length &&
          files.map((file) => {
            return (
              <li
                key={file.id}
                className="flex items-center gap-x-4 w-full px-2 h-14 max-w-full"
              >
                <div className="flex items-center gap-x-2 flex-1 py-1">
                  <DocumentIcon
                    size={24}
                    fileFormat={getFileType(typeof file.file === "string" ? "pdf" : file.file.type)}
                    className="shrink-0"
                  />
                  <p>{typeof file.file === "string" ? file.name : file.file.name?.slice(0, 30) + '...'}</p>
                </div>

                {progress[file.id] !== undefined &&
                  progress[file.id] !== 100 && (
                    <div className="w-48 flex gap-x-2 items-center justify-between h-2">
                      <div className="h-full w-40 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress[file.id]}%` }}
                        ></div>
                      </div>
                      <p className="w-8">{`${progress[file.id]}%`}</p>
                    </div>
                  )}
                <div className="flex gap-x-2 border-l pl-4 border-gray-100">
                  <a
                    href={typeof file.file === "string" ? file.file : URL.createObjectURL(file.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-8 flex items-center justify-center bg-gray-100 hover:brightness-90 rounded-lg"
                  >
                    <EyeSVG />
                  </a>

                  <Button
                    className="size-8 px-0 bg-red-100 hover:brightness-90 h-auto"
                    onClick={() => handleDeleteFile(file.id, file.name)}
                    type="button"
                  >
                    <TrashSVG className="text-red-500" />
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
      {hasMethods && handleError(name, methods) ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default FileInput;
