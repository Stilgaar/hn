import CustomDataGrid from "@/Components/DataGrid/CustomDataGrid";

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
            <CustomDataGrid rows={rows} dataGridColumns={dataGridColumns} dispatchType={dispatchType} />
        </>
    );
}

export default Employees;