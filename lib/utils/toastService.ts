import { Toast } from "react-native-toast-notifications";

const showToast = (message: string, type: "success" | "danger" | "warning" | "info" = "success") => {
  Toast.show(message, {
    type,
    placement: "top",
    duration: 3000,
    animationType: "slide-in",
  });
};

export default showToast;
