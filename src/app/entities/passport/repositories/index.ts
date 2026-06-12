import {
    addPassportService,
    confirmPassportService,
    deletePassportService,
    getAllPassportService,
    getPassportByIdService,
    getPassportDownloadAllFilesService,
    getPassportFileTypesService,
    updatePassportService,
  } from "@/app/services/passport.service";
  import { PassportRepositoryType } from "./passport.repository.type";
  import {
    passportByAllMigration,
    passportConfirmMigration,
    passportMigration,
    updatePassportMigration,
  } from "@/app/migration/passport.migration";
  import { passportFileTypesMigration } from "@/app/migration/passportFileTypes.migration";
  import { passportDownloadAllFilesMigration } from "@/app/migration/passportDownloadAllFiles.migration";
  
  const PassportRepository: PassportRepositoryType = {
    async createPassport(passport) {
      const migratedPassport = passportMigration.migrateToDSO(passport);
      const passportRes = await addPassportService(migratedPassport);
      return passportRes;
    },
  
    async confrimPassport(passport) {
      const migratedConfirmPassport =
        passportConfirmMigration.migrateToDSO(passport);
      const passportRes = await confirmPassportService(migratedConfirmPassport);
      return passportRes;
    },
  
    async getPassportByid(id) {
      const passportById = await getPassportByIdService(id);
      const migratedPassportById = await passportMigration.migrateToModel(
        passportById
      );
      return migratedPassportById;
    },
  
    async getAllPassport(query) {
      const getAllPassport = await getAllPassportService(query);
      const migratedGetAllPassport =
        passportByAllMigration.migrateToModel(getAllPassport);
      return migratedGetAllPassport;
    },
  
    async updatePassport(query) {
      const migratedUpdatePassport = updatePassportMigration.migrateToDSO(query);
      return await updatePassportService(migratedUpdatePassport);
    },
  
    async deletePassport(id) {
      return await deletePassportService(id);
    },
  
    async getPassportFileTypes() {
      const passportFileTypes = await getPassportFileTypesService();
      const migratedPassportFileTypes =
        passportFileTypesMigration.migrateToModel(passportFileTypes);
      return migratedPassportFileTypes;
    },
  
    async getPassportDownloadAllFiles(passportId) {
      const passportDownloadAllFiles = await getPassportDownloadAllFilesService(
        passportId
      );
      const migratedPassportById =
        await passportDownloadAllFilesMigration.migrateToModel(
          passportDownloadAllFiles
        );
      return migratedPassportById;
    },
  };
  
  export default PassportRepository;
    