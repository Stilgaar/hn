import { useCallback, useRef, useEffect, useState, useMemo } from "react";
import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";
import { setAllCheckedDataGridFilter } from "../DataGridStateManagement/checkedState/checkedDispatch";

function XlsSelectAllButton({
    getFilteredRowsOptions,
    dispatchType,
    keyInfo,
    getRowsOptions
}) {

    //////////////////
    // Check or unchecks everything
    const [checkedAll, setCheckedAll] = useState(false)
    const allOptionsRef = useRef([]);
    // use a ref to have the state alreay there instead of recalculating it.
    useEffect(() => {
        allOptionsRef.current = getRowsOptions
    }, [getRowsOptions]);

    const { checkedState, checkedDispatch } = useCheckedContext()
    const currentGlobalChecked = checkedState?.[dispatchType]?.[keyInfo] || new Set()

    const allOptionsChecked = useMemo(() => getFilteredRowsOptions?.every((option) => currentGlobalChecked.has(option)), [currentGlobalChecked])

    const handleCheckAll = useCallback((e) => {
        e.stopPropagation();

        let newCheckedSet;
        if (allOptionsChecked) {
            // If all are currently checked, we want to uncheck them all
            newCheckedSet = new Set();
            setCheckedAll(false)
        } else {
            // If not all checked, check them all
            newCheckedSet = new Set(getFilteredRowsOptions);
            setCheckedAll(true)
        }

        checkedDispatch(setAllCheckedDataGridFilter({ dispatchType, key: keyInfo, newCheckedSet }))

    }, [getFilteredRowsOptions, allOptionsChecked, dispatchType, keyInfo]);

    return (

        <div className={`row items-center`}>

            <input type={`checkbox`}
                id={`checkbox-checkall`}
                className={`input-checkbox-custom-studiel`}
                checked={checkedAll}
                disabled={!(getFilteredRowsOptions && !!getFilteredRowsOptions.length)}
                onChange={(e) => handleCheckAll(e)}
                onClick={(e) => e.stopPropagation()}

            />

            <label htmlFor={`checkbox-checkall`} className={`center`} />

            <span className={`pl-1 place-content-center`} onClick={(e) => handleCheckAll(e)}>
                {'Séléctionner tout'}
            </span>

        </div>

    );
}

export default XlsSelectAllButton;