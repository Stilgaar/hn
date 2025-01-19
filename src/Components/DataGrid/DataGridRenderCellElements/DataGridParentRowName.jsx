function DataGridParentRowName({
    rows,
    keyValue,
    children,
    getChildren
}) {

    const getParentRow = (rows) => {
        if (!getChildren) {
            return rows.filter(row => row.parent_GUID === null)
        }
    }

    const getParentRowName = getParentRow(rows)?.[0]?.[`${keyValue}`]

    ////////////////
    // JSX
    return (

        <>

            {getChildren ?

                <>{children}</>
                :
                <>{getParentRowName}</>
            }


        </>

    );
}

export default DataGridParentRowName;