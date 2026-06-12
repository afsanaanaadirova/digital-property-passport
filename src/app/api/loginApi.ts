import login_repository from "@/app/repositories/loginRepository";
import { LoginModel } from "@/data/model/login.model";
import { useMutation } from "@tanstack/react-query";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const login = () => {
    return useMutation({
      mutationFn: (query: LoginModel) => {
        return login_repository.login(query)
      },
      onSuccess: (_data, _variables) => {
        snackbar(SnackbarStatusEnum.SUCCESS, "Uğurla giriş olundu" );
      },
    });
  };