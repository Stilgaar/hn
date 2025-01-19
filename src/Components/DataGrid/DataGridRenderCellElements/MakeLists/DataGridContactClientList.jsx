import { dataRefs } from "@dataRefs/GlobalTextArray";

import { openInNewTab } from "../../../../../Functions/misc";

function DataGridContactClientList({
    clientList
}) {

    if (!clientList?.length) return <>-</>

    return (
        <div className={`col`}>
            {clientList.map((client, index) => (

                <p
                    onClick={(e) => openInNewTab(e, `/clients/information_clients/${client[dataRefs.clientGUID]}/info`)}
                    className={`td-span text-xs cursor-pointer hover:text-primary-color-1-500`}
                    key={index}>

                    {client[dataRefs.clientName_Key]}

                </p>

            ))}

        </div>
    );
}

export default DataGridContactClientList;