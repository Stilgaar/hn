function DataGridInsideList({
    listArray,
    keyItem
}) {

    ////////////////
    // JSX
    return (
        <>
            {listArray?.map((listItem, index) => (

                <div key={index}>
                    - {listItem[keyItem]}
                </div>
            ))}

        </>

    );
}

export default DataGridInsideList;