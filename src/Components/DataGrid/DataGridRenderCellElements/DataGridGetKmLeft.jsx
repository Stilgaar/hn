import { dataRefs } from "@dataRefs/GlobalTextArray";
import { formatKilometers } from "@functions/formatingData";

function DataGridGetKmLeft({ row }) {

    let getKmContract = Number(row[dataRefs.vehicleKmContract_Key])
    let getKmDone = Number(row[dataRefs.vehicleKmDone_Key])
    let getKmLeft = Number(row[dataRefs.vehicleKmLeft_Key])

    let isKmAbove = getKmDone > getKmContract
    let isKmLimit = getKmDone > getKmContract - 10000

    return (

        <span className={`${isKmAbove ? "text-error-500" : isKmLimit ? "text-primary-color-1-500" : "text-green-700"}`}>
            {formatKilometers(getKmLeft)}
        </span>

    );
}

export default DataGridGetKmLeft;