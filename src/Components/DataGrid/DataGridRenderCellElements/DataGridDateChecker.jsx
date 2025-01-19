import { formatToDateForDisplay } from "@functions/formatingData";

function DataGridDataChecker({
    date
}) {

    if (!date) return <>-</>

    const dateNow = new Date()
    const parsedDate = new Date(date);
    const isDateNowLater = dateNow > parsedDate;
    const dateToDisplay = formatToDateForDisplay(date)

    return (

        <div className={`${isDateNowLater ? 'text-error-500' : "text-green-700"}`}>

            {dateToDisplay}

        </div>

    );
}

export default DataGridDataChecker;