import SidePhoto from "public/side-photo.png";
import FormulyarLogoFullTextBlack from "@svg/logo-black.svg?react";
import EyeSlash from "@svg/eye-slash.svg?react";
import Eye from "@svg/eye.svg?react";
import Form from "@/ui/shared/Form";
import Input from "@/ui/shared/Input";
import Button from "@/ui/shared/Button"
import LoginVM from "./login.vm";

const Login = () => {
    const { handleToggle, submitHandler,methods,showPassword,loginApi } = LoginVM()

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
