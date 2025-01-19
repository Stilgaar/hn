/**
 * `DataGridDeletePic` - A component for adding delete functionality to items in a data grid.
 * This component renders a delete icon (imported as `DeleteI`) and, when clicked, dispatches 
 * a delete action to a global state management system. It's designed to be used within a data grid 
 * where each row needs a delete operation, allowing actions to be performed based on the row data and a dispatch type.
 *
 * @component
 * 
 * @param {Object} row - The data corresponding to a specific row in the data grid. 
 *                       This data is used to identify which item should be deleted.
 * @param {string} dispatchType - A string identifier for the type of delete action to be dispatched. 
 *                                This helps the global state manager to handle different delete actions appropriately.
 * 
 * @returns {React.Element} - An icon (DeleteI) that, when clicked, triggers a delete action for the specified row.
 *
 * @example
 * 
 * <DataGridDeletePic
 *   row={row}
 *   dispatchType="DELETE_USER"
 * /
 */


import useStateContext from "@/Hooks/StateManagement/useStateContext";
import { attributionPicsDELETE } from "@stateHooks/globalDispatcher";
import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridDeletePic({
    row,
    dispatchType
}) {

    const { globalDispatch } = useStateContext()

    // console.log(dispatchType)

    ////////////////
    // JSX
    return (

        <dataRefs.closeIcon
            onClick={() =>
                globalDispatch(attributionPicsDELETE(row.index, dispatchType, row, dataRefs[`${dispatchType}_sendFiles`]))}
        />

    );
}

export default DataGridDeletePic;