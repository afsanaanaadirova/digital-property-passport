import { useNavigate } from "react-router-dom";
import { login } from "@/app/api/loginApi";
import { LoginModel } from "@/data/model/login.model";
import { FieldErrors, useForm } from "react-hook-form";
import { setCookie } from "@/app/helpers/cookies";
import { useState } from "react";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";


const LoginVm = () => {
  const loginApi = login();
  const navigate = useNavigate();

  const [showPassword, setPassword] = useState(false);

  const handleToggle = () => {
    setPassword(!showPassword);
  };

  const methods = useForm<LoginModel>({
    mode: "onChange",
  });

  const onError = (data: FieldErrors<LoginModel>) => {
    console.error("error:", data);
  };

  const submitHandler = methods.handleSubmit((data: LoginModel) => {
    loginApi.mutate(data, {
      onSuccess(res: any) {
        setCookie("tokenPA", res.token, 10);
        methods.reset();
        navigate("/passports");
      },
      onError(error: any) {
        if (error.response.status === 400) {
          snackbar(SnackbarStatusEnum.ERROR, error.response.data.Detail);
        }
      },
    });
  }, onError);

  return {
    handleToggle, submitHandler, methods, showPassword, loginApi
  }
}

export default LoginVm
