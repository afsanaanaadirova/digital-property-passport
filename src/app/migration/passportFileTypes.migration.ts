import { PassportFileTypesDTO } from "@/data/dto/passportFileTypes.dto";
import { PassportFileTypesModel } from "@/data/model/passportFileTypes.model";

export const passportFileTypesMigration = {
  migrateToModel(dto: PassportFileTypesDTO): PassportFileTypesModel[] {
    const passportFileTypes = dto.passportFileTypes;
    return passportFileTypes.map((passportFileType) => {
      return {
        id: passportFileType.id,
        name: passportFileType.name,
        fileAccept:passportFileType.fileAccept
      };
    });
  },
};
