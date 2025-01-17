import useFetch from "../Common/useFetch"

const useDashboardFetch = (shouldFetch = true) => {

    const dashboardURL = `${import.meta.env.VITE_APP_FAKE_DATA}/Dashboard.json`

    const {
        data: dashboardData,
        pending: dashboardPending,
        error: dashboardError,
        setError: dashboardSetError,
        refresh: dashboardRefresh,
    } = useFetch(dashboardURL, shouldFetch)

    return {
        dashboardData,
        dashboardError,
        dashboardPending,
        dashboardSetError,
        dashboardRefresh
    }

}

export default useDashboardFetch