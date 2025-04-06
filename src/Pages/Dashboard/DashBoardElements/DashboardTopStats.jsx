// personal fetch for the dashboard
import useDashboardFetch from "@/Hooks/FetchHooks/useDashboardFetch";

// Layout Component
import CardLayout from "@/Components/Layout/CardLayout";

// Simple components
import Text from "@/Components/Basic/Text";
import Title from "@/Components/Basic/Title";

// all the texts icons etc
import { dataRefs } from "@/JSONS/FrTexts/globalTexts";

// array to show data
import { statGlobalCards } from "@/JSONS/FR/DashboardArray";

const DashBoardCardsMini = ({ stat }) => {

    const { dashboardData } = useDashboardFetch()
    const data = dashboardData?.topStats

    ////////////////s
    // JSX
    return (

        <CardLayout css={`md:w-6/12 lg:w-3/12 w-full flex flex-nowrap flex-row `}>

            <CardLayout css={`w-10/12 rounded-l-lg shadow`}>

                <Title text={stat.title} El={"h4"} css={`uppercase font-bold text-sm`} />

                <div className={`flex flex-row`}>

                    <Text text={data?.[stat.data]} css={`text-xs`} />

                    {stat.hasArrow &&

                        <dataRefs.simpleDashboardArrow size={20} className={`flex justify-center items-center px-1`} />

                    }

                    <Text text={stat.text1} css={`text-xs pl-1`} />

                </div>

                <Text text={stat.text2} css={`text-xs`} />

            </CardLayout>

            <CardLayout css={`w-2/12 rounded-r-lg shadow bg-gradient-to-b from-cyan-500 to-blue-500`}>

            </CardLayout >

        </CardLayout>

    )

}

function DashboardTopStats() {

    return (

        <div className={`w-full flex flex-row lg:flex-nowrap flex-wrap`}>

            {statGlobalCards.map((stat, idx) => (

                <DashBoardCardsMini key={idx} stat={stat} />

            ))}

        </div>

    );
}

export default DashboardTopStats;