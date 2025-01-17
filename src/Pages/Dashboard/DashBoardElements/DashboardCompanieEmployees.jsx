// personal fetch for the dashboard
import useDashboardFetch from "@/Hooks/FetchHooks/useDashboardFetch";

// simmple components
import Text from "@/Components/Basic/Text";
import LottiesRender from "@/Components/Basic/LottiesRender";

// all the texts icons etc
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

// array to render the componen
import { companyDashboardLottiesCard } from "@/JSONS/FR/DashboardArray";

// wrapper for the dashboard elements so they're all the same
import DashboardElementsWrapper from "../DashboardSharedElements/DashboardElementsWrapper";

function DashboardCompanieEmployees() {

    const { dashboardData } = useDashboardFetch()
    const data = dashboardData?.employeesStats

    ////////////////
    // JSX
    return (

        <DashboardElementsWrapper width={`w-3/12`} title={dataRefs.dashboardCompaniesTitle}>

            <div className={`flex flex-row flex-wrap`}>

                {companyDashboardLottiesCard.map(companyEmployee => (

                    <div className={`w-4/12 flex flex-col justify-center items-center ${companyEmployee.up ? "mb-3" : "mt-2"}`}>

                        <LottiesRender icon={companyEmployee.icon} />

                        <Text text={data?.[companyEmployee.data]} css={`font-bold`} />

                        <Text text={companyEmployee.title} css={`text-xs bold`} />

                    </div>

                ))}

            </div>

        </DashboardElementsWrapper>
    );
}

export default DashboardCompanieEmployees;