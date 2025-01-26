
import { dataGridRefs } from "../DataGridRenderElements/dataGridRefs";
import { useFilterContext } from "../DataGridFilterContext/DataGridsFilterContext";
import { initialiseDataGridFilters } from "../DataGridStateManagement/filterState/filterDispatch";
import { useCheckedContext } from "../DataGridFilterContext/CheckedContext";
import { initialiseDataGridChecked } from "../DataGridStateManagement/checkedState/checkedDispatch";

function DataGridGlobalResetBtn({ dataGridColumns, dispatchType, setSortColumns }) {

    const { filterDispatch } = useFilterContext()
    const { checkedDispatch } = useCheckedContext()

    const handleResetAllHeaders = () => {
        filterDispatch(initialiseDataGridFilters(dataGridColumns, dispatchType))
        checkedDispatch(initialiseDataGridChecked())
    }

    return (

        <div className={`custom-selector place-content-center pl-3`}>

            <dataGridRefs.resetIcon onClick={() => {
                handleResetAllHeaders()
                setSortColumns([])
            }}
                title={`Reset`}
                size={22}
                className={`hover:text-primary-color-1 font-sm cursor-pointer`} />

        </div>

    );
}

export default DataGridGlobalResetBtn;