import axios from "axios";
import { BASE_URL } from "@/data/utils/environments";
import { getCookie } from "../helpers/cookies";
const tokenPA = getCookie("tokenPA");
const newUrl = new URL(window.location.href)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: tokenPA ? {
    Authorization: "Bearer " + getCookie("tokenPA"),
  } : {},
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      newUrl.searchParams.delete("tokenPA");
      if (!newUrl.searchParams.get("tokenPA")) {
        window.location.href = `/login`;
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
