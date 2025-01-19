/**
 * `DataGridRights` - A component for managing user rights within a data grid.
 * This component allows toggling specific rights for a user and submits the changes via an API call.
 *
 * @component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.row - The data row containing user rights information.
 * @param {string} props.rightName - The name of the right to be modified.
 * @param {string} props.right - The GUID of the right to be modified.
 * 
 * @returns {React.Element} - A div element containing an icon that indicates the current status of the right and allows toggling it.
 *
 * @example
 * <DataGridRights
 *   row={{ droits: [{ module_guid: '123', view: true, edit: false }] }}
 *   rightName="view"
 *   right="123"
 * />
 */

// React inbuild hooks
import { useEffect, useState } from "react";

// All the texts and icons
import { dataRefs } from "@dataRefs/GlobalTextArray";

// Personnal Submit Hook
import useSubmit from "@commonHooks/useSubmit"

// Bulles notifications
import { notifyError, notifySuccess } from "@functions/notifications";

function DataGridRights({
    row,
    rightName,
    right,
}) {

    // Find the object that is currently used.
    const findRight = row.droits.find(elem => elem.module_guid === right)
    const [modifyRight, setModifyRight] = useState(() => findRight)

    const { handleSubmit, resMsg, error } = useSubmit()

    // This will be a POST later
    const handleModifyData = (e, rightName, modifyRight) => {
        e.stopPropagation()

        const changeRight = {};

        // Iterate over the keys in modifyRight
        Object.keys(modifyRight).forEach(key => {
            if (key === dataRefs.rightGUID) {
                // Keep 'droit_guid' unchanged
                changeRight[key] = modifyRight[key];
            } else if (key === rightName) {
                // Toggle the selected right
                changeRight[key] = !modifyRight[key];
            } else if (key !== 'module_guid' && key !== 'module_nom') {
                // Set other rights to null
                changeRight[key] = null;
            }
            // Exclude 'module_guid' and 'module_nom' by not adding them to changeRight
        });

        setModifyRight(changeRight);

        handleSubmit({
            e,
            url: `${import.meta.env.VITE_APP_API}/api/${dataRefs.rights_ROUTE}/droit`,
            body: changeRight,
            method: "PUT",
            userNeeded: false
        })
    }

    useEffect(() => {
        if (resMsg && resMsg.ok) {
            notifySuccess("Changement effectué !")
        }
    }, [resMsg])

    useEffect(() => {
        if (error) {
            notifyError("Changement Impossible")
        }
    }, [resMsg])

    ////////////////
    // JSX
    return (

        <div className={`centered pt-075`}>

            {modifyRight && modifyRight[rightName] ?

                <dataRefs.doneIcon
                    key={modifyRight.module_guid}
                    style={{ color: "green" }}
                    className={`datagrid-icons place-content-center`}
                    onClick={e => handleModifyData(e, rightName, modifyRight)}
                />

                :

                <dataRefs.doNotDistrubIcon
                    key={modifyRight}
                    style={{ color: "red" }}
                    className={`datagrid-icons`}
                    onClick={e => handleModifyData(e, rightName, modifyRight)}
                />
            }

        </div>


    );
}

export default DataGridRights;