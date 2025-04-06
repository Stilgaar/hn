import { dataRefs } from "@/JSONS/FrTexts/globalTexts";

import Text from "@/Components/Basic/Text";
import CardLayout from "@/Components/Layout/CardLayout";

export const DataGridEmpty = ({
    colSpan,
    dataGridEmptyHeight = 'h-[150px]'
}) => {

    ////////////////
    // JSX
    return (

        <tr className={`grow ${dataGridEmptyHeight}`}>

            <td colSpan={colSpan} className={`grow`}>
            </td>

        </tr>

    );
}

////////////////
// DataGridNoData
export const DataGridNoData = () => {

    ////////////////
    // JSX
    return (

        <CardLayout css={`w-full h-[85vh] flex justify-center items-center`}>

            <Text css={`text-4xl font-bold`}>
                {dataRefs.nodatatoshow}
            </Text>

        </CardLayout>

    );
}

////////////////
// DataGridEmptyRowsRenderer
export const DataGridEmptyRowsRenderer = () => {

    ////////////////
    // JSX
    return (
        <div className={`t-center text-black`}
            style={{ gridColumn: '1/-1' }}>

            {dataRefs.nothingToRender}

        </div>
    );
}