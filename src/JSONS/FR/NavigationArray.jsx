import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "@/Components/Layout/MainLayout";
import Navigation from "@/Components/Navigation/Navigation";
import ErrorBoundary from "@/Functions/Error/ErrorBoundary";

import { lazyRetry } from "@/Functions/NavigationHelpers/lazyRetry";

import { dataRefs } from "../FrTexts/globalTexts";

const Dashboard = lazy(() => lazyRetry(() => import("../../Pages/Dashboard/Dashboard")));

const Employees = lazy(() => lazyRetry(() => import("../../Pages/Employees/Employees")))

export const companyNavigation = [
    {
        element: <Dashboard />,
        text: dataRefs.dashboardTitle,
        path: dataRefs.dashboard_PATH
    },
    {
        element: <Employees />,
        text: dataRefs.employeesTitle,
        path: dataRefs.employees_PATH
    }
]

function NavBarWarpper({ nav }) {

    return (

        <>

            <Navigation navigation={nav} />

            <MainLayout>

                <ErrorBoundary>

                    <Suspense fallback={"Loading  .... "}>

                        <Outlet />

                    </Suspense>

                </ErrorBoundary>

            </MainLayout>


        </>
    )
}

export const globalNavigation = [
    {
        path: "/",
        element: (


            <NavBarWarpper nav={companyNavigation} />

        ),
        children: companyNavigation
    }
]