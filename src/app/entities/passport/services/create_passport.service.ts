import axiosInstance from "@/app/lib/axios.config";
import { PassportReqDTO } from "../req_dto/create_passport.req_dto";
import { endpoints } from "@/data/utils/endpoints";

export const addPassportService = async (passport: PassportReqDTO) => {
  const res = await axiosInstance.post(endpoints.passportCreate(), passport);
  return res.data;
};