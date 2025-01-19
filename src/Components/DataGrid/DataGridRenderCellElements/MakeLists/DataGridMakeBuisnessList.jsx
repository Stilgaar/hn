import { Fragment, useId } from "react";

import { dataRefs } from "@dataRefs/GlobalTextArray";

import DataGridLinker from "../DataGridLinker";

function DataGridMakeBuisnessList({
    buisnessList
}) {

    if (!buisnessList?.length) return <>-</>

    const id = useId()

    return (

        <div className={`col`}>

            {buisnessList.map((buisness, index) => (

                <Fragment key={`${index}-${id}`}>

                    {buisness[dataRefs.buisnessGUID] ?

                        <DataGridLinker
                            key={buisness[dataRefs.buisnessNumberList_Key]}
                            linkTo={`/buisness/information_buisness`}
                            guid={buisness[dataRefs.buisnessGUID]}
                            slug={`info`}>

                            <p>{buisness[dataRefs.buisnessNumberList_Key]}</p>

                        </DataGridLinker>

                        :
                        <div className={`td-under`}>
                            {buisness[dataRefs.buisnessNumberList_Key]}
                        </div>

                    }

                </Fragment>
            ))}

        </div>

    );
}

export default DataGridMakeBuisnessList;