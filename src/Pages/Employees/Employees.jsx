import DataGrid from "@/Components/DataGrid/CustomDataGrid";
import { dataGridRefs } from "@/Components/DataGrid/DataGridRenderElements/dataGridRefs";

function Employees() {

    const rows = [
        {
            element: "one"
        },
        {
            element: "two"
        }
    ]

    const dataGridColumns = [
        {
            key: "element", name: "Element"
        }
    ]

    const dispatchType = "EmployeeTestDispatch"

    return (

        <>
            <DataGrid
                rows={rows}
                dataGridColumns={dataGridColumns}
                dispatchType={dispatchType}
                hvMin="h-full"
            />
        </>
    );
}

export default Employees;