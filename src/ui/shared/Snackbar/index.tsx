import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleSnackbar = (
  status: SnackbarStatusEnum,
  message: string,
  options?: Record<string, ToastOptions<unknown>>
) => {
  const statusSnackbar = {
    success: () => toast.success(message, options),
    error: () => toast.error(message, options),
    warning: () => toast.warning(message, options),
    info: () => toast.info(message, options),
  };

  return statusSnackbar[status as keyof typeof statusSnackbar]();
};

export const snackbar = (
  status: SnackbarStatusEnum,
  message: string,
  options?: Record<string, any>
) => {
  return handleSnackbar(status, message, options);
};
