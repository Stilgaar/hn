// Modified useTransformPromise hook
import { use } from "react"

const promiseCache = new Map()

const useTransformPromise = (fn, key) => {
    const refetch = () => {
        // Clear the cache for this key and create a new promise
        promiseCache.delete(key)
        promiseCache.set(key, fn())
        // Force a re-render (you'll need to trigger this from a client component)
    }

    if (!promiseCache.has(key)) {
        promiseCache.set(key, fn())
    }


    const promise = promiseCache.get(key)
    const result = use(promise)

    console.log(promiseCache)
    // Return both the result and the refetch function
    return { data: result, refetch }
}

export default useTransformPromise