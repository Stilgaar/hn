import { dataRefs } from "@dataRefs/GlobalTextArray";
import Btn from "@basicElems/Btn";

import { openInNewTab } from "@functions/misc";

function DataGridNavTo({ guid, navTo }) {

    const route = `${navTo}${guid}`;

    return (

        <Btn handleClick={(e) => openInNewTab(route)}
            xl={true}
            cssDiv={`flex justify-end`}>

            {dataRefs.information_contact}

        </ Btn>

    );
}

export default DataGridNavTo;