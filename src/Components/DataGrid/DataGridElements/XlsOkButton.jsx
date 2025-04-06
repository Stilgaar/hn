import BtnDataGrid from "./BtnDataGrid";

import { useFilterContext } from "../DataGridFilterContext/DataGridsFilterContext";
import { dataRefs } from "@/JSONS/FrTexts/globalTexts";
import { dataGridRefs } from "../DataGridRenderElements/dataGridRefs";

import { addDelFiltersDataGrid } from "../DataGridStateManagement/filterState/filterDispatch";

import { useOptionsVisibility } from "../DataGridFilterContext/VisilibityContext";

import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";

function XlsOkButton({
    dispatchType,
    keyInfo,
    onSortColumnsChange,
    sort,
    getFilteredRowsOptions
}) {

    const { filterDispatch } = useFilterContext()
    const { checkedState } = useCheckedContext();
    const checkedTopush = checkedState?.[dispatchType]?.[keyInfo] || new Set()

    const { setIsOptionsVisible } = useOptionsVisibility();

    //////////////////
    // Desactivate the button if there are no valid options
    const isButtonValid = checkedState.size === 0

    //////////////////
    // Validate the current options
    const handleValidateOptions = (e) => {
        e.stopPropagation();
        setIsOptionsVisible(false);
        onSortColumnsChange(sort);

        const validOptions = Array.from(checkedTopush)
            .filter(option => option === dataRefs.empty || getFilteredRowsOptions.includes(option));

        // GLOBAL FILTER RELATED
        filterDispatch(addDelFiltersDataGrid(keyInfo, dispatchType, validOptions))
    };


    return (

        <BtnDataGrid disabled={isButtonValid}
            handleClick={handleValidateOptions}
            right={true}>

            <span className={`place-content-center pr-2`}>
                <dataGridRefs.searchIcon size={20} />
            </span>

            <span className={`t-center place-content-center`}>
                {dataRefs.okButton}
            </span>

        </BtnDataGrid>
    );
}

export default XlsOkButton;