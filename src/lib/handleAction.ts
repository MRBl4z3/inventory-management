import { toast } from "react-toastify"

interface Props {
    success: string,
    error: string,
    data: FormData,
    action: (data: FormData) => Promise<any | void>
}

export default async function handleAction({ action, data, error, success }: Props) {
    try {
        await action(data)
        toast.success(success)
        return true
    } catch (e) {
        toast.error(error)
        return false
    }

}