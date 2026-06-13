import { PassportFormModel, PassportModel, UpdatePassportRequest } from "@/data/model/passport.model";

export type PassportRepositoryType = {
  createPassport(passport: PassportFormModel): Promise<unknown>;
  getPassportByid(id: number): Promise<PassportModel>;
  getAllPassport(query: string): Promise<any>;
  updatePassport(query: UpdatePassportRequest): Promise<unknown>;
  confrimPassport(query: { passpostId: number }): Promise<any>;
  deletePassport(id: number): Promise<unknown>;
  getPassportDownloadAllFiles(id: number): Promise<unknown>;
  getPassportFileTypes(): any;
  // getPassportFileTypes(): Promise<PassportFileTypesModel[]>;
};
