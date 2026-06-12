import SidePhoto from "public/side-photo.png";
import FormulyarLogoFullTextBlack from "@svg/logo-black.svg?react";
import EyeSlash from "@svg/eye-slash.svg?react";
import Eye from "@svg/eye.svg?react";
import Form from "@/ui/shared/Form";
import Input from "@/ui/shared/Input";
import { useNavigate } from "react-router-dom";
import Button from "@/ui/shared/Button";
import { login } from "@/app/api/loginApi";
import { LoginModel } from "@/data/model/login.model";
import { FieldErrors, useForm } from "react-hook-form";
import { setCookie } from "@/app/helpers/cookies";
import { useState } from "react";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

const Login = () => {
  const loginApi = login();
  const navigate = useNavigate();

  const [showPassword, setPassword] = useState(false);

  const handleToggle = () => {
    setPassword(!showPassword);
  };

  const methods = useForm<LoginModel>({
    // resolver: zodResolver(addPostSchema),
    // defaultValues: resetForm,
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

  return (
    <div className="flex justify-between items-center">
      <div className="px-24 pt-14 flex flex-col h-screen flex-1 items-center">
        <FormulyarLogoFullTextBlack />
        <Form
          className="w-full pt-40 flex flex-col text-center"
          methods={methods}
          onSubmit={submitHandler}
        >
          <h5 className="text-30px700 text-gray-800 pb-14">Hesaba daxil ol</h5>
          <div className="flex flex-col gap-y-5">
            <Input name="email" label="E-mail" />
            <Input
              name="password"
              label="Şifrə"
              className="cursor-pointer"
              type={showPassword ? "text" : "password"}
              trailing={
                <div onClick={handleToggle} >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </div>
              }
            />
          </div>
          <Button
            className="rounded-[10px] bg-gray-800 mt-5"
            isLoading={loginApi.isPending}
          >
            Daxil ol
          </Button>
        </Form>
      </div>
      <div className="flex-[2] h-screen">
        <img
          src={SidePhoto}
          alt="no result"
          className="size-full  object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
