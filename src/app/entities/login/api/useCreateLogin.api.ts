import type { CreateLoginModel } from "../models/create_login.model"
import login_repository from "../repositories";
import { useMutation } from "@tanstack/react-query";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const login = () => {
    return useMutation({
      mutationFn: (query: CreateLoginModel) => {
        return login_repository.login(query)
      },
      onSuccess: (_data, _variables) => {
        snackbar(SnackbarStatusEnum.SUCCESS, "Uğurla giriş olundu" );
      },
    });
  };