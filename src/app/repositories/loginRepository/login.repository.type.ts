import { type LoginModel } from "@/data/model/login.model";

export type LoginRespositoryType = {
  login(login: LoginModel): Promise<unknown>;
};
