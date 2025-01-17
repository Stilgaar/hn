// personal fetch for the dashboard
import useDashboardFetch from "@/Hooks/FetchHooks/useDashboardFetch";

// all the texts icons etc
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

// wrapper for the dashboard elements so they're all the same
import DashboardElementsWrapper from "../DashboardSharedElements/DashboardElementsWrapper";

// Bars Chart Components
import MyBarChart from "../DashboardSharedElements/MyBarChart";

function DashboardLastOffers() {

    const { dashboardData } = useDashboardFetch()
    const data = dashboardData?.jobOffers

    ////////////////
    // JSX
    return (

        <DashboardElementsWrapper width={`w-6/12`} title={dataRefs.joboffers_Title}>

            <MyBarChart dataSetOne={data}
                height={`h-[200px]`}
                firstDataSetName={dataRefs.jobOffersDashBoardNew_Key}
                secondDataSetName={dataRefs.jobOffersDashboardPending_Key}
                thirdDataSetName={dataRefs.jobOffersDashboardClosed_Key} />

        </DashboardElementsWrapper>

    );
}

export default DashboardLastOffers;