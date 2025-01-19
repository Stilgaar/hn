import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridInterventionList({
    interventions
}) {

    if (!interventions?.length) return <>-</>

    return (

        <div className={`col`}>

            {interventions.map((intervention, index) => (

                <p className={`td-span`} key={index}>

                    {intervention[dataRefs.internventionGUID_Type]}

                </p>

            ))}


        </div>

    );
}

export default DataGridInterventionList;