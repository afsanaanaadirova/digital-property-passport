import { PassportModel } from "@/data/model/passport.model";

export type AppealDetailsTabType = {
    passportByid: PassportModel | undefined;
    isLoading: boolean;
  };
  