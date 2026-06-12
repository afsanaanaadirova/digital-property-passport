import axiosInstance from "@/app/lib/axios.config";
import { PassportDSO } from "@/data/dso/passport.dso";
import { PassportByIdDTO, PassportGetAllDTO } from "@/data/dto/passport.dto";
import { endpoints } from "@/data/utils/endpoints";
import { validator } from "../helpers/validator";
import { passportGetAllSchema } from "@/data/schemas/dtoValidations/passportGetAll.schema";
import { PassportFileTypesDTO } from "@/data/dto/passportFileTypes.dto";
import { passportFileTypesSchema } from "@/data/schemas/dtoValidations/passportFileTypes.schema";
import { PassportUpdateDSO } from "@/data/dso/passportUpdate.dso";
import { PassportDownloadAllFilesDTO } from "@/data/dto/passportDownloadAllFiles.dto";

export const addPassportService = async (passport: PassportDSO) => {
  const res = await axiosInstance.post(endpoints.passportCreate(), passport);
  return res.data;
};
export const confirmPassportService = async (passport: { id: number }) => {
  const res = await axiosInstance.post(endpoints.passportConfirm(), passport);
  return res.data;
};

export const getPassportByIdService = async (id: number) => {
  const res = await axiosInstance.get<PassportByIdDTO>(
    endpoints.passportGetById(id)
  );
  return res.data;
};

export const getAllPassportService = async (query: string) => {
  const res = await axiosInstance.get<PassportGetAllDTO>(
    endpoints.passportGetAll(query)
  );
  return validator({
    endpoint: endpoints.passportGetAll(query),
    schema: passportGetAllSchema,
    response: res.data,
  });
};

export const updatePassportService = async (query: PassportUpdateDSO) => {
  const res = await axiosInstance.put(endpoints.passportUpdate(), query);
  return res.data;
};

export const deletePassportService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.passportDelete(id));
  return res.data;
};

export const getPassportFileTypesService = async () => {
  const res = await axiosInstance.get<PassportFileTypesDTO>(
    endpoints.passportFileTypes()
  );
  return validator({
    endpoint: endpoints.passportFileTypes(),
    schema: passportFileTypesSchema,
    response: res.data,
  });
};

export const getPassportDownloadAllFilesService = async (passportId: number) => {
  const res = await axiosInstance.get<PassportDownloadAllFilesDTO>(
    endpoints.passportDownloadAllFiles(passportId)
  );
  return res.data;
};

