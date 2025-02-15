import BtnDataGrid from "./BtnDataGrid";

import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";
import { useOptionsVisibility } from "../DataGridFilterContext/VisilibityContext";
import { resetAllCheckedDataGridFilters } from "../DataGridStateManagement/checkedState/checkedDispatch";

import { dataGridRefs } from "../DataGridRenderElements/dataGridRefs";

function XlsCancelButton({
    dispatchType,
    keyInfo
}) {

    const { checkedDispatch } = useCheckedContext()
    const { setIsOptionsVisible } = useOptionsVisibility();

    //////////////////
    // Function cancel the options
    const handleCancelOptions = (e) => {
        e.stopPropagation();
        setIsOptionsVisible("");
        checkedDispatch(resetAllCheckedDataGridFilters({ dispatchType, key: keyInfo }))
    };

    return (
        <BtnDataGrid handleClick={handleCancelOptions}
            left={true}>

            <span className={`place-content-center pr-2`}>
                <dataGridRefs.cancelIcon size={20} />
            </span>

            <span className={`place-content-center`}>
                {dataGridRefs.abord}
            </span>

        </BtnDataGrid>

    );
}

export default XlsCancelButton;