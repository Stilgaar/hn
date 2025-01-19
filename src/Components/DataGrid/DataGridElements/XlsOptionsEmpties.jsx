import { useCallback } from "react";

import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";

import { toggleCheckedOptionDataGridFilters } from "../DataGridStateManagement/checkedState/checkedDispatch";

function XlsOptionsHasEmpties({
    dispatchType,
    keyInfo,
}) {

    const { checkedState, checkedDispatch } = useCheckedContext()
    const currentGlobalChecked = checkedState?.[dispatchType]?.[keyInfo] || new Set()

    ////////////////
    // Logic to add the checked elements in an array, so that we can make the filter with it.
    const handleClickCheckBox = useCallback((e, option) => {
        e.preventDefault();
        checkedDispatch(toggleCheckedOptionDataGridFilters({ dispatchType, key: keyInfo, option }));
    }, [keyInfo, dispatchType, checkedDispatch]);

    return (

        <div
            className={`row items-center`}
            onClick={(e) => handleClickCheckBox(e, dataRefs.empty)}
        >
            <input
                type={`checkbox`}
                id={`checkbox-empty`}
                className={`input-checkbox-custom-studiel`}
                checked={currentGlobalChecked?.has(dataRefs.empty)}
                onChange={(e) => handleClickCheckBox(e, dataRefs.empty)}
                onClick={(e) => e.stopPropagation()}
            />

            <label htmlFor="checkbox-empty" />

            <span className={`pl-1 place-content-center`}>{dataRefs.empty}</span>

        </div>

    );
}

export default XlsOptionsHasEmpties;