// import { toast } from "react-toastify";

// export const ToastAlert = (message: string) => {
//   toast(message, {
//     progressClassName: "custom-toast-class",
//     hideProgressBar: true,
//     closeButton: false,
//     className: "custom-toast-class custom-body-class",
//     position: "top-center",
//   });
// };
// export const ToastError = (message: string) => {
//   toast(message, {
//     progressClassName: "custom-toast-class-error",
//     hideProgressBar: true,
//     closeButton: false,
//     className: "custom-toast-class-error custom-body-class",
//     position: "top-center",
//   });
// };

import { toast } from "react-toastify";

export const ToastAlert = (message: string) => {
  toast(message, {
    progressClassName: "custom-toast-class",
    // bodyClassName: "custom-body-class",
    hideProgressBar: true,
    closeButton: false,
    className: "custom-toast-class",
    position: "top-center",
  });
};
export const ToastError = (message: string) => {
  toast(message, {
    progressClassName: "custom-toast-class-error",
    // bodyClassName: "custom-body-class",
    hideProgressBar: true,
    closeButton: false,
    className: "custom-toast-class-error",
    position: "top-center",
  });
};
