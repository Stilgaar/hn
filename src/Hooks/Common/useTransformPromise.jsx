// Modified useTransformPromise hook
import { use } from "react"
import { fetchData } from "@/Pages/Dashboard/DashboardFetchs/getDashboardData"

const promiseCache = new Map()

const useTransformPromise = (url, key) => {

    const refetch = () => {
        // Clear the cache for this key and create a new promise
        promiseCache.delete(key)
        promiseCache.set(key, fetchData(url))
        // Force a re-render (you'll need to trigger this from a client component)
    }

    if (!promiseCache.has(key)) {
        promiseCache.set(key, fetchData(url))
    }

    const promise = promiseCache.get(key)
    const result = use(promise)
    // Return both the result and the refetch function
    return { data: result, refetch }
}

export default useTransformPromise