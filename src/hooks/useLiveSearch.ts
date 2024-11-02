import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function useLiveSearch(filterBy: string, filterKey: string) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [debouncedFilterValue] = useDebounce(filterKey, 500)

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (debouncedFilterValue) {
            params.set('filter_by', filterBy)
            params.set('filter_key', filterKey)
        } else {
            params.delete('filter_by')
            params.delete('filter_key')
        }

        router.replace(`${pathname}?${params.toString()}`)
    }, [debouncedFilterValue, filterBy])
}