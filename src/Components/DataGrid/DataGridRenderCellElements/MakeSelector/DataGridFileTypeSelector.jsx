import CustomDatalistComponent from "@inputElems/InputAndSelectorElements/CustomDataListComponent";

function DataGridFileTypeSelector({
    level,
    dispatchType,
    options,
    inputSelector,
}) {

    return (

        <>

            {options?.data && options?.data?.length > 0 &&

                <CustomDatalistComponent
                    divMargin={`my-[10px]`}
                    input={inputSelector}
                    level={level}
                    dataListArray={options}
                    dispatchType={dispatchType} />
            }

        </>

    );
}

export default DataGridFileTypeSelector;