import { toast } from "react-toastify";

export const handleSuccess = (msg, duration = 1000) => {
  toast.dismiss();
  toast.success(msg, { position: "top-right", closeOnClick: true, draggable: true, autoClose: duration, pauseOnHover: false, hideProgressBar: false });
};

export const handleError = (msg, duration = 1000) => {
  toast.dismiss();
  toast.error(msg, { position: "top-right", closeOnClick: true, draggable: true, autoClose: duration, pauseOnHover: false, hideProgressBar: false });
};

export const handleWarning = (msg, duration = 1000) => {
  toast.dismiss();
  toast.warning(msg, { position: "top-right", closeOnClick: true, draggable: true, autoClose: duration, pauseOnHover: false, hideProgressBar: false });
};