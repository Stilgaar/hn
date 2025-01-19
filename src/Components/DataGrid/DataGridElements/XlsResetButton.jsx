import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

import BtnDataGrid from "./BtnDataGrid";

import { useOptionsVisibility } from "../DataGridFilterContext/VisilibityContext";

import { useFilterContext } from "../DataGridFilterContext/DataGridsFilterContext";
import { resetFilterList } from "../DataGridStateManagement/filterState/filterDispatch";

import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";
import { resetAllCheckedDataGridFilters } from "../DataGridStateManagement/checkedState/checkedDispatch";

function XlsResetButton({
    setfilterInput,
    dispatchType,
    keyInfo,
}) {

    const { checkedDispatch } = useCheckedContext()
    const { filterDispatch } = useFilterContext()

    const { setIsOptionsVisible } = useOptionsVisibility();

    //////////////////
    // Function cto reset all the options ()
    const handleResetOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
        checkedDispatch(resetAllCheckedDataGridFilters({ dispatchType, key: keyInfo }))
        filterDispatch(resetFilterList(dispatchType, keyInfo))
        setfilterInput("");
        setIsOptionsVisible(false);
    };

    return (
        <BtnDataGrid handleClick={handleResetOptions} >

            <span className={`place-content-center pr-2`}>
                <dataRefs.resetIcon size={20} />
            </span>

            <span className={`place-content-center`}>
                {dataRefs.reset}
            </span>

        </BtnDataGrid>

    );
}

export default XlsResetButton