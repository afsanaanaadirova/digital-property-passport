import axiosInstance from "@/app/lib/axios.config";
import type { LoginReqDTO } from "../req_dto/create_login.req_dto"
import { endpoints } from "@/data/utils/endpoints";

export const loginService = async (login: LoginReqDTO) => {
    const res = await axiosInstance.post(endpoints.login(), login);
    return res.data;
  };
