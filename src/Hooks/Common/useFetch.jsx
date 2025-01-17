import useSWR from 'swr'

const useFetch = (url, shouldFetch) => {

    const fetcher = async (url) => {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 401) {
            location.reload();
        }

        if (!res.ok) {
            throw new Error(`HTTP error! STATUS: ${res.status}`);
        }

        const contentType = res.headers.get("Content-Type");
        return contentType && contentType.includes("application/json")
            ? res.json()
            : res.text();
    };

    const { data, error, isValidating, mutate } = useSWR(
        shouldFetch ? url : null,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            retry: 3,
            dedupingInterval: 500
        }
    );

    return {
        data,
        refresh: mutate,
        pending: isValidating,
        error: error?.message,
        setError: () => mutate(undefined, { revalidate: false }),
        resMsg: data ? { ok: true, status: 200 } : null
    };
};

export default useFetch;