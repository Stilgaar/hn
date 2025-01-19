import { dataRefs } from "@/JSON/Fr/GlobalTextArray";

function DataGridServiceList({ serviceList }) {

    if (!serviceList?.length) return <>-</>

    return (

        <div className={`col`}>

            {serviceList.map((service, index) => (

                <p className={`td-span`} key={index}>

                    {service[dataRefs.serviceNameForDel_Key]}

                </p>

            ))}


        </div>
    )

}

export default DataGridServiceList;