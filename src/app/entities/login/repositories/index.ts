import type { LoginRespositoryType } from "./login.repository.type";
import type { LoginDSO } from "@/data/dso/login.dso";
import { loginService } from "@/app/services/login.service";

const LoginRepository: LoginRespositoryType = {
  async login(login) {
    return await loginService(login as LoginDSO);
  },
};

export default LoginRepository;
