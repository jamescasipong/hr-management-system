import { use } from "react";
import { toast, useSonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";


type toastDescriptionsProps = {
    type: ToastType;
    message: string;
    duration: number;
}

const toastDescriptions = (props: toastDescriptionsProps) => {
    const { type, message, duration } = props;
    switch (type) {
        case "success":
            toast.success(message, { duration });
            break;
        case "error":
            toast.error(message, { duration });
            break;
        case "warning":
            toast.warning(message, { duration });
            break;
        case "info":
            toast.info(message, { duration });
            break;
        default:
            break;
    }
}

const toastWithUndo = (message: string, duration: number) => {
    toast.success(message, {
        duration,
        action: {
            label: "Undo",
            onClick: () => {
                toast.error("Undo successful", { duration: 2000 });
            }
        }
    });
}


