import axiosInstance from "@/app/lib/axios.config";
import { LoginDSO } from "@/data/dso/login.dso";
import { endpoints } from "@/data/utils/endpoints";

export const loginService = async (login: LoginDSO) => {
    const res = await axiosInstance.post(endpoints.login(), login);
    return res.data;
  };