import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import EyeSVG from "@svg/deleteIcon.svg?react";
import TrashSVG from "@svg/deleteIcon.svg?react";
import PlusSquareSVG from "@svg/deleteIcon.svg?react";
import Button from "../Button";
import axiosInstance from "@/app/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import Skeleton from "../Skeleton";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { cn } from "@/app/utils/cn";
import { handleError } from "@/app/helpers/handleError";
import DocumentIcon from "../DocumentIcon";
import { getFileType } from "@/app/helpers/getFileType";
import { getCookie } from "@/app/helpers/cookies";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const FileInput = ({ name, label, ...props }: Props) => {
  const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  const hasMethods = methods && methods.formState;
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileUpload = useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.post("File/Upload", data, {
        headers: {
          accept: "multipart/form-data",
          Authorization: "Bearer " + getCookie("tokenPA"),
        },
      });
    },
    onError: (_error, _variables) => {},
    onSuccess: (_data, _variables) => {
      setUploadedFiles([...uploadedFiles, ...files]);
      setFiles([]);
      if (methods) {
        methods.setValue(name, _data.data.fileIds);
        methods.trigger(name);
      }
    },
    onSettled: () => {},
  });
  const fileDelete = useMutation({
    mutationFn: (fileId: number) => {
      return axiosInstance.delete(
        "Appeal/DeleteAppealFile?AppealFileId=" + fileId
      );
    },

    onError: (_error, _variables) => {},
    onSuccess: (_data, _variables) => {
      console.log("_data", _data);
    },
    onSettled: () => {},
  });

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((files) => (files ? [...files, ...newFiles] : newFiles));
      const formData = new FormData();
      newFiles.forEach((formFile) => {
        // formData.append(
        //   `SaveAppFileRequest[${index}].id`,
        //   (index + 1).toString()
        // );
        formData.append(`file`, formFile);
      });
      fileUpload.mutate(formData);
    }
  };

  const handleDeleteFile = (index: number) => {
    fileDelete.mutate(fileUpload.data?.data.fileIds[index]);
  };

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
              "flex justify-center items-center h-10 rounded-md border ",
              props.disabled
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50",
              hasMethods && handleError(name, methods)
                ? "bg-error-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            )}
          >
            <div className="text-16px500 flex gap-1 p-4">
            Sənədi yüklə
              <PlusSquareSVG className="h-6" />
            </div>
          </label>
        </div>
        <input
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
          (!!uploadedFiles.length || fileUpload.isPending) && "my-3"
        )}
      >
        {!!uploadedFiles.length &&
          uploadedFiles.map((file, index) => (
            <li key={file.size} className="flex gap-x-4 w-full px-2">
              <div className="flex items-center gap-x-2 flex-1 border-r py-1 border-gray-100">
                <DocumentIcon size={24} fileFormat={getFileType(file.type)} />
                <p>{file.name}</p>
              </div>
              <div className="flex gap-x-2">
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 flex items-center justify-center bg-gray-100 hover:brightness-90 rounded-lg"
                >
                  <EyeSVG />
                </a>
                <Button
                  className="size-8 px-0 bg-red-100 hover:brightness-90"
                  onClick={() => handleDeleteFile(index)}
                >
                  <TrashSVG className="text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        {fileUpload.isPending &&
          [...Array(files.length)].map((_, i) => (
            <div className="w-full h-8 flex gap-2 px-2" key={i}>
              <Skeleton className="w-8 shrink-0" />
              <Skeleton className="w-1/2" />
              <Skeleton className="ml-auto w-8 shrink-0" />
              <Skeleton className="w-8 shrink-0" />
            </div>
          ))}
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
