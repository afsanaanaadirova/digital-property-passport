import { useGetPassportById, usePassportFileTypes } from "@/app/api/passport.api";
import { useEffect, useState } from "react";
import { useFieldArray} from "react-hook-form";
import { useParams } from "react-router-dom";
import { ObjectAttachmentsInfoFormProps } from "./object_attachments_info_form.type";


const ObjectAttachmentsInfoFormVM = ({ methods }: Pick<ObjectAttachmentsInfoFormProps, "methods">) => {
  const params = useParams()
  const { data: passportFileTypes, isLoading: passportFileTypesLoading } = usePassportFileTypes();
  const { data: passportByid, isLoading: passportLoading } = useGetPassportById(Number(params.id));
  const [existingFileNames, setExistingFileNames] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  const updateFileNames = (newFileName: string, isDeleting: boolean) => {
    setExistingFileNames((prevFileNames) => {
      const updatedFileNames = isDeleting
        ? prevFileNames.filter((name: any) => name !== newFileName)
        : prevFileNames.includes(newFileName)
          ? prevFileNames
          : [...prevFileNames, newFileName];

      return updatedFileNames;
    });
  };

  const { fields: passportFiles, replace: replace } = useFieldArray({
    name: "passportFiles",
    control: methods.control,

  });
  useEffect(() => {
    if (!passportFileTypesLoading && passportFileTypes) {
      const updatedPassportFiles = params.id
        ? passportFileTypes.map((type: any) => {
          const existingData = passportByid?.passportFiles?.find(
            (p) => p.id === type.id
          );
          return existingData && existingData.files?.length
            ? existingData
            : { ...type, files: [] };
        })
        : passportFileTypes;
      replace(updatedPassportFiles);
    }
  }, [replace]);
  
  return {
    updateFileNames,
    existingFileNames,
    passportFiles,
    setUploadLoading,
    uploadLoading,
    deleteIds,
    setDeleteIds,
    uploadSuccess
  }
}

export default ObjectAttachmentsInfoFormVM
