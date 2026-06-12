import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../helpers/cookies";
import axiosInstance from "../lib/axios.config";

const AuthProtectedRoute = () => {
  const navigate = useNavigate();
  const tokenPA = getCookie("tokenPA");

  tokenPA && (axiosInstance.defaults.headers.Authorization = "Bearer " + tokenPA)

  useEffect(()=>{
    !tokenPA && navigate("/login")
  },[tokenPA])

  return tokenPA ? <Outlet /> : null;
};

export default AuthProtectedRoute;
