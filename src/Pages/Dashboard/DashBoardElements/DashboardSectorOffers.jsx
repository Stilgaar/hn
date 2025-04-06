// all the texts icons etc
import { dataRefs } from "@/JSONS/FrTexts/globalTexts";

// wrapper for the dashboard elements so they're all the same
import DashboardElementsWrapper from "../DashboardSharedElements/DashboardElementsWrapper";
import MyPieChart from "../DashboardSharedElements/MyPieChart";
import useDashboardFetch from "@/Hooks/FetchHooks/useDashboardFetch";

function DashboardSectorOffers() {

    const { dashboardData } = useDashboardFetch()
    const data = dashboardData?.secttorOffers

    ////////////////
    // JSX
    return (

        <DashboardElementsWrapper title={dataRefs.dashboarSectorOfferTitle} width={`w-3/12`}>

            <MyPieChart dataValues={data} height={`h-[200px]`} />

        </DashboardElementsWrapper>

    );
}

export default DashboardSectorOffers;