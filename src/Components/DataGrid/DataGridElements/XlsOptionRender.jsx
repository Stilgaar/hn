import { useCallback } from "react";
import { formatToDateForDisplay } from "@/Functions/formatingData";
import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";
import { toggleCheckedOptionDataGridFilters } from "../DataGridStateManagement/checkedState/checkedDispatch";

function XlsOptionsRender({
    getFilteredRowsOptions,
    dispatchType,
    keyInfo,
    sortType
}) {

    const { checkedState, checkedDispatch } = useCheckedContext();
    const currentChecked = checkedState[dispatchType]?.[keyInfo] || new Set();

    ////////////////
    // Logic to add the checked elements in an array, so that we can make the filter with it.
    const handleClickCheckBox = useCallback((e, option) => {
        e.preventDefault();
        checkedDispatch(toggleCheckedOptionDataGridFilters({ dispatchType, key: keyInfo, option }))
    }, [dispatchType, keyInfo, currentChecked]);

    //////////////////
    // Get the options with the 
    const getOption = (option) => {
        if (option === "true") {
            return "Vrai"
        } else if (option === "false") {
            return "Faux"
        } else return option
    }

    return (

        <ul className={`custom-selector-filter`}>

            {getFilteredRowsOptions && !!getFilteredRowsOptions.length ? (
                getFilteredRowsOptions
                    .slice(0, 100)
                    .map((option, index) => (

                        <li
                            key={`${option}-${index}`}
                            className={`custom-selector-filter-li p-[6px] ${index % 2 ? "pair" : "impair"}`}>

                            <div
                                className={`row items-center`}
                                onClick={(e) => {
                                    handleClickCheckBox(e, (sortType === "date" ? formatToDateForDisplay(option) : option))
                                }}
                            >
                                <input
                                    type={`checkbox`}
                                    id={`checkbox-${index}`}
                                    className={`input-checkbox-custom-studiel`}
                                    checked={currentChecked.has(option)}
                                    onChange={(e) => handleClickCheckBox(e, (sortType === "date" ? formatToDateForDisplay(option) : option))}
                                    onClick={(e) => e.stopPropagation()}
                                />

                                <label htmlFor={`checkbox-${index}`} />

                                <span className={`pl-1 flex place-content-center`}>

                                    {getOption(option)}

                                </span>

                            </div>
                        </li>
                    ))
            ) : (

                <li className={`custom-selector-filter-li`}>

                    - Aucune donnée -

                </li>

            )}

        </ul>);
}

export default XlsOptionsRender;