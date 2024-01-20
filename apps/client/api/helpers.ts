import toast from "react-hot-toast"

export const showError = (message?: string) => {
    toast.error(message || "This didn't work.")
}

export const showSuccess = () => {
    toast.success("Done!")
}