import { useMutation} from "@tanstack/react-query";
import PassportRepository from "../repositories/index";
import { PassportModel } from "@/data/model/passport.model";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const useCreatePassport = () => {
  return useMutation({
    mutationFn: (passport: PassportModel) => {
      return PassportRepository.createPassport(passport);
    },
    onSuccess: (_data, _variables) => {
      snackbar(SnackbarStatusEnum.SUCCESS, "Qaralama kimi əlavə olundu");
    },
  });
};
