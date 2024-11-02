import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";



export default function useCheckbox():
    [
        string[],
        (e: ChangeEvent<HTMLInputElement>) => void,
        Dispatch<SetStateAction<string[]>>
    ] {
    const [state, setState] = useState<string[]>([])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            const newState = [e.currentTarget.value, ...state]
            setState(newState)
        } else {
            const filtered = state.filter(value => value !== e.currentTarget.value)
            setState(filtered)
        }
    }

    return [state, onChange, setState]
} 