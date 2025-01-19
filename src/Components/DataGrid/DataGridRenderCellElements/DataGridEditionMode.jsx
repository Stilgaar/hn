import { dataRefs } from "@dataRefs/GlobalTextArray";

import useStateContext from "@/Hooks/StateManagement/useStateContext";
import { useToggleContext } from "@/Context/ToggleContext/ToggleContext";

import { setModifyObject } from "@stateHooks/globalDispatcher";
import { openAndCloseModals } from "@/Hooks/StateManagement/toggleState/toggleDispatch";

import { createModifyObject } from "@functions/modifyData";

function DataGridEditionMode({
    row,
    dispatchType,
}) {

    const { globalDispatch } = useStateContext()
    const { toggleDispatch } = useToggleContext()

    const handleOpenModal = (e) => {
        const newData = createModifyObject(row);
        globalDispatch(setModifyObject(dispatchType, newData));
        toggleDispatch(openAndCloseModals(dispatchType))
    }

    return (

        <dataRefs.editIcon
            className={`cursor-pointer centered`}
            onClick={handleOpenModal} />
    );
}

export default DataGridEditionMode;