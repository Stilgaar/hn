import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridVehicleOwnersList({ ownerList }) {

    if (!ownerList?.length) return <>-</>

    return (
        <div className={`col`}>

            {ownerList.map((owner, index) => (

                <p className={`td-span text-xs cursor-pointer hover:text-primary-color-1-500`}
                    key={index}>

                    {owner[dataRefs.vehicleOwnerName_Key]}

                </p>

            ))}

        </div>
    );
}

export default DataGridVehicleOwnersList;