import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridEstimateCommercialList({ listCommercial }) {

    if (!listCommercial?.length) return <>-</>

    return (

        <div className={`col`}>

            {listCommercial.map((commercial, index) => (

                <p className={`td-span text-xs cursor-pointer hover:text-primary-color-1-500`}
                    key={index}>

                    {commercial[dataRefs.clientName_Key]}

                </p>

            ))}

        </div>

    );
}

export default DataGridEstimateCommercialList;