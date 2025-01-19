import DataGridLinker from "../DataGridLinker";

import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridMakeEstimateList({
    names,
}) {

    if (!names?.length) return <>-</>

    return (

        <>

            {names !== undefined &&

                <div className={`col`}>

                    {names?.map((name, idx) => (

                        <DataGridLinker
                            key={idx}
                            linkTo={`/estimate/information_estimate`}
                            guid={name[dataRefs.estimateGUID]}
                            slug={`info`}>

                            {name[dataRefs.estimateName_Key]}

                        </DataGridLinker>



                    ))

                    }

                </div>
            }


        </>

    );
}

export default DataGridMakeEstimateList;