import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PassportRepository from "../repositories/passportRepository";
import { PassportModel } from "@/data/model/passport.model";
import { RevalidateTagsEnum } from "@/data/enum/revalidate_tags.enum";
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

export const useGetPassportById = (id: number) => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.PASSPORTBYID, id],
    queryFn: () => {
      return PassportRepository.getPassportByid(id);
    },
    enabled: !!id,
  });
};

export const useGetAllPassport = (query: string) => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.PASSPORTGETALL, query],
    queryFn: () => {
      return PassportRepository.getAllPassport(query);
    },
  });
};

export const useUpdatePassport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (passport: PassportModel) => {
      return PassportRepository.updatePassport(passport);
    },
    onSuccess: async (_data, _variables) => {
      await queryClient.invalidateQueries({
        queryKey: [RevalidateTagsEnum.PASSPORTBYID],
      });
       snackbar(SnackbarStatusEnum.SUCCESS, "Qaralama kimi əlavə olundu");
    },
  });
};

export const useConfirmPassport = () => {
  return useMutation({
    mutationFn: (passport: { passpostId: number }) => {
      return PassportRepository.confrimPassport(passport);
    },
    onSuccess: (_data, _variables) => {
      snackbar(SnackbarStatusEnum.SUCCESS, "Uğurla təsdiq olundu");
    }
  });
};

export const useDeletePassport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return PassportRepository.deletePassport(id);
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({
        queryKey: [RevalidateTagsEnum.PASSPORTGETALL],
      });
    },
  });
};

export const usePassportFileTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.PASSPORTFILETYPES],
    queryFn: () => {
      return PassportRepository.getPassportFileTypes();
    },
  });
};

export const useGetPassportDownloadAllFiles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (passportId: number) => {
      return PassportRepository.getPassportDownloadAllFiles(passportId);
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({
        queryKey: [RevalidateTagsEnum.PASSPORTGETALL],
      });
    },
  });
};