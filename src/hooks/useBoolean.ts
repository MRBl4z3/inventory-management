import { Dispatch, SetStateAction, useState } from "react";

export default function useBoolean(initial: boolean | undefined = false):
    [
        boolean,
        () => void
    ] {
    const [boolean, setBoolean] = useState(initial)
    const change = () => setBoolean(p => !p)

    return [boolean, change]
}