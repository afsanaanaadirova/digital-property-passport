import { FileFormatType } from "@/ui/shared/DocumentIcon/document_icon.type";

export const getFileType = (fileName: string = "pdf") => {
  const type = fileName.split("/");
  const extentionFileFormat = type.length > 1 ? type[1] : fileName;
  return extentionFileFormat as FileFormatType;
};
