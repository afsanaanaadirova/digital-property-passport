import { PassportDownloadAllFilesDTO } from "@/data/dto/passportDownloadAllFiles.dto";
import { PassportDownloadAllFilesModel } from "@/data/model/passportDownloadAllFiles.model";

export const passportDownloadAllFilesMigration = {
  migrateToModel(dto: PassportDownloadAllFilesDTO): PassportDownloadAllFilesModel {
    const base64String = dto.compressedFile;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: dto.contentType });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = dto.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
    return {
        compressedFile: dto.compressedFile,
        fileName: dto.fileName,
        fileSize: dto.fileSize,
        contentType: dto.contentType
    };
  },
};
