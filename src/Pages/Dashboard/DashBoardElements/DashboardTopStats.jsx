import CardLayout from "@/Components/Layout/CardLayout";
import Text from "@/Components/Basic/Text";

import { statGlobalCards } from "@/JSONS/FR/DashboardArray";

const DashBoardCardsMini = ({ stat, data }) => {

    return (

        <CardLayout css={`w-full flex flex-nowrap flex-row `}>

            <CardLayout css={`w-10/12 p-1 rounded-l-lg shadow`}>

                <Text text={stat.title} css={`uppercase font-bold text-sm`} />

                <div className={`flex flex-row`}>
                    <Text text={data[stat.data]} css={`text-xs`} />

                    <Text text={stat.text1} css={`text-xs pl-1`} />
                </div>

                <Text text={stat.text2} css={`text-xs`} />

            </CardLayout>

            <CardLayout css={`w-2/12 rounded-r-lg shadow`}>

            </CardLayout >

        </CardLayout>

    )

}

function DashboardTopStats({ data }) {

    return (

        <div className={`flex flex-row flex-nowrap`}>

            {statGlobalCards.map((stat, idx) => (

                <DashBoardCardsMini key={idx} stat={stat} data={data} />

            ))}

        </div>

    );
}

export default DashboardTopStats;