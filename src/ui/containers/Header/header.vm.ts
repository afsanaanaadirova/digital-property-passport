import { getCookie} from "@/app/helpers/cookies";
import { CustomJwtPayload } from "./header.type";
import { jwtDecode } from "jwt-decode";

export const HeaderVM = () => {
  const getCookieData = getCookie("tokenPA");

  let user: CustomJwtPayload | null = null;

  if (getCookieData) {
    user = jwtDecode<CustomJwtPayload>(getCookieData);
  }

  return { user }
}