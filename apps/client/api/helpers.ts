import toast from "react-hot-toast"

export const showError = (message?: string) => {
    toast.error(message || "This didn't work.")
}

export const showSuccess = (message?: string) => {
    toast.success(message || "Done!")
}