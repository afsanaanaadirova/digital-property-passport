import { PassportModel } from "@/data/model/passport.model";

export type PassportRepositoryType = {
  createPassport(passport: PassportModel): Promise<unknown>;
  getPassportByid(id: number): Promise<PassportModel>;
  getAllPassport(query: string): Promise<any>;
  updatePassport(query: PassportModel): Promise<unknown>;
  confrimPassport(query: { passpostId: number }): Promise<any>;
  deletePassport(id: number): Promise<unknown>;
  getPassportDownloadAllFiles(id: number): Promise<unknown>;
  getPassportFileTypes(): any;
  // getPassportFileTypes(): Promise<PassportFileTypesModel[]>;
};
