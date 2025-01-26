// React inbuild hooks
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";

import useGetFilters from "../DataGridHooks/useGetFilters";

// Al the texts and stuff
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";
import { dataGridRefs } from "../DataGridRenderElements/dataGridRefs";

// Personal hook to consume the related context. This is for the popup windows for the search. (so there is only one that can pop up at the same time)
import { useOptionsVisibility } from "../DataGridFilterContext/VisilibityContext";
import { formatToDateForDisplay, normalizeNameLowerCase } from "@/Functions/formatingData";
import XlsOptionsHasEmpties from "../DataGridElements/XlsOptionsEmpties";
import XlsOptionsRender from "../DataGridElements/XlsOptionRender";
import XlsOkButton from "../DataGridElements/XlsOkButton";
import XlsSelectAllButton from "../DataGridElements/XlsSelectAllButton";
import XlsResetButton from "../DataGridElements/XlsResetButton";
import XlsCancelButton from "../DataGridElements/XlsCancelButton";
import DataGridGlobalResetBtn from "../DataGridElements/DataGridGlobalResetBtn";

const XLSFilterInReact = ({
    column,
    rows,
    finalRowsForOptions,
    onSortColumnsChange,
    sortColumns,
    memoizedWidth,
    dispatchType,
}) => {

    ////////////////
    // Decomposition of the column, for readability
    const {
        key, // key from the data matching the key for rendering
        secondSortingKey, // this is when i have an array with multiple infos to show
        sortType, // Date // Number // None
        cellHeaderClass, // add custom class
        name, // Name of the column (label)
        secondKey,
        keyArray
    } = column

    ////////////////
    // This is a filter options, that gives the possiblity to open juste ONE filter at once. So it doesnt get messy x)
    const { isOptionsVisible, setIsOptionsVisible } = useOptionsVisibility();

    // This is fot the with of the rows, they're calculated and memoiszed in the CustomDataGrid element. Then passed down to avoid rerenderings.
    const findMemoisez = useMemo(() => memoizedWidth?.find(elem => elem.name === key)?.width, [key])

    // GLOBAL FILTER RELATED
    const { filters } = useGetFilters({ dispatchType, key })

    //////////////////
    // Readability in JSX
    // Checks if a filter is present. (used for the jsx but also for the rows and finalrows sorting when sorted or not)
    const isFilter = !!filters?.length

    //////////////////
    // State to store the current sorting before validating, also the useeffects, resets if you resets sortColumns with the reset button
    const [sort, setSort] = useState([])

    //////////////////
    // State to store the current search input before validating
    const [filterInput, setfilterInput] = useState()

    //////////////////
    // This is a tiny specal state for the <RotateLeftI /> icon, so when its selected it turns around
    const [rotation, setRotation] = useState('rotate(180deg)')

    useEffect(() => {
        if (isOptionsVisible === (secondSortingKey ? secondSortingKey : key)) {
            setRotation('rotate(0deg)')
        } else {
            setRotation('rotate(90deg)')
        }
    }, [isOptionsVisible, key, secondSortingKey])

    //////////////////
    // Sort part of the filter. Here its for the render if its selected or not
    // first in the currentSort of the data array
    const currentSort = useMemo(() =>
        sortColumns.find(sc => sc.columnKey === column.key),
        [sortColumns, column.key]
    );
    // this is when its not validated yet so they can still see whats selected
    const currentPendingSort = sort.find(sc => sc.columnKey === column.key)
    // the selection of theses
    const { direction } = currentSort || ""
    const { direction: stateDirection } = currentPendingSort || ""
    // sets of conditions to change the css when clicked.
    const upper = (stateDirection || direction) === 'DESC'
    const downer = (stateDirection || direction) === "ASC"
    const cssUpper = upper ? "text-green-700" : ""
    const cssDowner = downer ? "text-green-700" : ""

    ////////////////
    // Function to set temporairly the sort filter in the corresponding useState (smaler to bigger)
    // Will be effective when "ok" is clicked
    const handleSortSmallerToBigger = e => {

        e.stopPropagation()

        if (!currentSort || upper || !direction) {

            setSort([{
                columnKey: column.key,
                direction: "ASC"
            }])

        } else {

            setSort([{
                columnKey: column.key,
                direction: ""
            }])
        }
    }

    ////////////////
    // Function to set temporairly the sort filter in the corresponding useState (bigger to smaller)
    // Will be effective when "ok" is clicked
    const handleSortBiggerToSmaller = e => {

        e.stopPropagation()

        if (!currentSort || downer || !direction) {

            setSort([{
                columnKey: column.key,
                direction: "DESC"
            }])

        } else {

            setSort([{
                columnKey: column.key,
                direction: ""
            }])
        }
    }

    // Function to generate the available options from a list of rows.
    // Note: An empty value must be included to be a valid option.
    // Even though it will be filtered out later, it still needs to be present,
    // as the absence would make the option invalid for checking/unchecking.

    const makeOptions = useCallback((rows) => {

        // Use reduce to accumulate values from each row into a Set (for uniqueness).
        const resultSet = rows?.reduce((acc, row) => {

            // Extract the primary key value from the row based on the provided column key.
            const value = row[column.key];

            // If the value exists (i.e., not undefined), proceed.
            if (value !== undefined) {

                // If there's a second key, extract its value; if not, use an empty string.
                const secondValue = column.secondKey ? row[column.secondKey] || "" : "";

                // Check if the value is an array.
                if (Array.isArray(value)) {

                    // If the array is empty, add a reference to the empty value.
                    if (value.length === 0) {
                        acc.add(dataRefs.empty);
                    }

                    // For each element in the array:
                    value.forEach((r) => {
                        const nestedValue = r[column.keyArray]; // Get the nested value from the array.

                        // Combine the nested value with secondValue if secondKey exists.
                        const combinedValue = column.secondKey
                            ? `${nestedValue} - ${secondValue}`
                            : nestedValue;

                        // Handle cases where nestedValue is falsy (empty, null) but not explicitly boolean.
                        if (!nestedValue && typeof nestedValue !== "boolean") {
                            acc.add(dataRefs.empty); // Add empty reference if it's empty or null.
                        }
                        // For boolean values, add "true" or "false".
                        else if (typeof nestedValue === "boolean") {
                            acc.add("true");
                            acc.add("false");
                        }
                        // For other valid values, add the combined value.
                        else if (nestedValue && typeof nestedValue !== "boolean") {
                            acc.add(combinedValue);
                        }
                    });

                } else {
                    // If the value is not an array, handle it directly.
                    const combinedValue = column.secondKey
                        ? `${value} - ${secondValue}`
                        : value;

                    // Handle non-boolean falsy values.
                    if (!value && typeof value !== "boolean") {
                        acc.add(dataRefs.empty); // Add empty reference.
                    }
                    // For boolean values, add "true" or "false".
                    else if (typeof value === "boolean") {
                        acc.add("true");
                        acc.add("false");
                    }
                    // For other valid values, add the combined value.
                    else if (value && typeof value !== "boolean") {
                        if (sortType === "date") {
                            acc.add(formatToDateForDisplay(value))
                        } else {
                            acc.add(combinedValue);
                        }
                    }
                }
            }

            return acc; // Return the updated accumulator (Set).
        }, new Set()); // Initialize with an empty Set to ensure unique values.

        // Convert the Set to an array (Set ensures uniqueness).
        const result = Array.from(resultSet);

        return result; // Return the final array of options.
    }, [key, secondKey, keyArray]);// Dependencies: these variables are used inside the callback, so the hook re-executes when they change.


    //////////////////
    // Function to sort options depnending on other rows. Uses ROWS and FINALROWS. Rows are all the data, FINALROWS are the sorted data.
    // Uses isFilter to know when to filter with rows or finalRowsForOptions
    // I COULD WRAP MY NECK AROUND HAVING 1/ LAYERS (like in clients) AND 2/ FILTERING THE UNAVIABLE OPTIONS IN 
    // here check finalRowsForOptions
    const getRowsOptions = useMemo(() => {
        if (rows && rows.length && finalRowsForOptions && !!finalRowsForOptions.length) {
            // if (rows && rows.length && currentGlobalFilters  && !!currentGlobalFilters .length) {
            if (isFilter) return makeOptions(rows)
            return makeOptions(finalRowsForOptions);
        }
    }, [isFilter, rows, finalRowsForOptions])

    ////////////////
    // Function and call of the function to see if there are any empy entries
    const checkEmpty = useCallback((rows) => {
        return rows?.some((elem) => {
            const value = elem[column.key];
            return (
                value === null ||
                value === undefined ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            );
        });

    }, [column.key]);

    const getEmptyRow = checkEmpty(rows);

    ////////////////
    // Transition function for the filter input beacause i needed to use getRowsOptions again.
    const getFilteredRowsOptions = useMemo(() => {
        return getRowsOptions
            ?.filter((option) => (!filterInput ? true : normalizeNameLowerCase(option).includes(normalizeNameLowerCase(filterInput))))
            ?.filter((opt) => opt !== dataRefs.empty);
    }, [getRowsOptions, filterInput]);

    //////////////////
    // Function cancel the options
    const handleChangeInputSearch = (e) => setfilterInput(e.target.value)

    //////////////////
    // Autoreset
    useEffect(() => {
        if (sortColumns && sortColumns.length === 0) {
            setSort([])
        }
    }, [sortColumns])

    //////////////////
    // Generic Sortrer (for everything ?!)
    const Sorter = ({
        IconDataRefsBigger,
        IconDataRefsSmaller,
        bigger,
        smaller,
    }) => {

        return (

            <div>

                <div className={`cursor-pointer text-xs flex items-center ${cssDowner}`}
                    onClick={handleSortSmallerToBigger}>

                    {!IconDataRefsBigger ? null :
                        <IconDataRefsBigger size={20} />
                    }
                    <span>
                        {bigger}
                    </span>

                </div>

                <div className={`cursor-pointer text-xs flex items-center ${cssUpper}`}
                    onClick={handleSortBiggerToSmaller}>

                    {!IconDataRefsSmaller ? null :
                        <IconDataRefsSmaller size={20} />
                    }

                    <span>
                        {smaller}
                    </span>

                </div>

            </div>


        )
    }

    const modalRef = useRef(null);

    // Add useEffect to handle clicks outside the modal
    useEffect(() => {

        const handleClickOutside = (event) => {
            // Only run if the modal is visible
            if (isOptionsVisible === (secondSortingKey ? secondSortingKey : key)) {
                // Check if the click is outside both the modal and the opener button
                if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.custom-selector')) {
                    setIsOptionsVisible("");
                }
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOptionsVisible, secondSortingKey, key, setIsOptionsVisible]);

    ////////////////
    // JSX
    return (

        <>
            {/* HEADER NAME FILTER ROTATING ARROW */}

            <div ref={modalRef}
                className={`custom-selector ${sortType !== "noFilter" && "cursor-pointer"}`}
                style={{ minWidth: findMemoisez }}
                onClick={() => sortType !== "noFilter" && setIsOptionsVisible(secondSortingKey ? secondSortingKey : key)}
            >

                {sortType !== "none" &&

                    <div className={`w-full row ${sortType === "noFilter" ? "place-content-center" : "justify-between"}`}>

                        <span className={`w-full whitespace-nowrap ${cellHeaderClass ? cellHeaderClass : ""}`}>

                            {/* NAME */}
                            {name ? name : dataRefs[key]}

                        </span>

                        {sortType !== "noFilter" &&

                            <div className={`w-4/12 row justify-end items-center whitespace-nowrap `}>


                                {/* FILTER ICON*/}
                                {isFilter &&
                                    <>x</>
                                    // <dataRefs.filter size={19} className={`text-primary-color-1-600`} />

                                }
                                <>x</>
                                {/* ARROW ICON */}
                                {/* <dataRefs.filterIconOpener size={19} style={{ transform: rotation }} className={`mr-2`} /> */}

                            </div>
                        }

                    </div>
                }

                {/* MODAL  */} {/* MODAL  */} {/* MODAL  */}

                {isOptionsVisible === (secondSortingKey ? secondSortingKey : key) && (

                    <div className={`custom-selector-div w-[330px] border-[1px] border-grey-500 shadow-2xl font-thin bg-light-grey absolute p-4`}>

                        {/* SORTERS */} {/* SORTERS */} {/* SORTERS */}

                        {sortType === "numCompare" ?

                            // NUMERICAL SORTERS
                            <Sorter bigger={dataRefs.smallerToBiggerNumbers} smaller={dataRefs.biggerToSmallerNumbers}
                                IconDataRefsBigger={dataRefs.sortNum91} IconDataRefsSmaller={dataRefs.sortNum19} />

                            : sortType === "date" ?

                                // DATE SORTERS
                                <Sorter bigger={dataRefs.biggerToSmallerDates} smaller={dataRefs.smallerToBiggerDates} />

                                :

                                // ALPHABETICAL SORTER
                                <Sorter bigger={dataGridRefs.smallerToBigger} smaller={dataGridRefs.biggerToSmaller}
                                    IconDataRefsBigger={dataGridRefs.atozIcon} IconDataRefsSmaller={dataGridRefs.ztoaItonc} />

                        }

                        {/* SELECT ALL  */} {/* SELECT ALL  */} {/* SELECT ALL  */}

                        <div className={`col pt-3`}>

                            <XlsSelectAllButton
                                getFilteredRowsOptions={getFilteredRowsOptions}
                                dispatchType={dispatchType}
                                keyInfo={key}
                                getRowsOptions={getRowsOptions}

                            />

                            {/* EMPTY */} {/* EMPTY */} {/* EMPTY */}

                            {getEmptyRow && (

                                <XlsOptionsHasEmpties dispatchType={dispatchType} keyInfo={key} />
                            )}

                        </div>

                        {/* SEARCH ZONE */} {/* SEARCH ZONE */} {/* SEARCH ZONE */}

                        <div className={`col my-2 relative`}>

                            <input
                                className={`${dataRefs.inputTail} !bg-white`}
                                id={`searchInput`}
                                placeholder={` `}
                                autoFocus
                                value={filterInput || ""}
                                onChange={handleChangeInputSearch}
                                autoComplete={`one-time-code`}
                                autoCorrect={`off`}
                                spellCheck={`false`}
                            />

                            <label htmlFor={`inputID`}
                                className={dataRefs.labelTail}
                                autoComplete={`one-time-code`}
                                autoCorrect={`off`}
                                spellCheck={`false`}>

                                {dataRefs.search}

                            </label>

                        </div>

                        {/* OPTIONS */} {/* OPTIONS */} {/* OPTIONS */}

                        <XlsOptionsRender getFilteredRowsOptions={getFilteredRowsOptions}
                            dispatchType={dispatchType}
                            keyInfo={key}
                            sortType={sortType} />

                        {/* BUTTONS */}  {/* BUTTONS */} {/* BUTTONS */}

                        <div className={`flex row pt-4`}>

                            <XlsCancelButton
                                dispatchType={dispatchType}
                                keyInfo={key} />

                            <XlsResetButton
                                keyInfo={key}
                                dispatchType={dispatchType}
                                setfilterInput={setfilterInput} />

                            <XlsOkButton
                                getFilteredRowsOptions={getFilteredRowsOptions}
                                dispatchType={dispatchType}
                                keyInfo={key}
                                sort={sort}
                                onSortColumnsChange={onSortColumnsChange} />

                        </div>

                    </div>

                )}

            </div>

        </>
    )
}


export const transformDataGridColumns = ({
    dataGridColumns,
    rows,
    finalRowsForOptions,
    onSortColumnsChange,
    sortColumns,
    setSortColumns,
    memoizedWidth,
    dispatchType,
}) => {

    ////////////////
    // Justin Case
    // console.log("dataGridColumns", dataGridColumns)
    // console.log("rows", rows)
    // console.log('setFilters', setFilters)
    // console.log("onSortColumnsChange", onSortColumnsChange)
    // console.log("sortColumns", sortColumns)
    // console.log("memoizedWidth",memoizedWidth)
    // console.log('isOptionsVisible', isOptionsVisible)

    return dataGridColumns?.map((column, idx) => {

        return {
            ...column,
            renderHeaderCell: () => (

                <div className={`col`} key={idx}>

                    <div className={``}>

                        {column.button ? (

                            <DataGridGlobalResetBtn
                                setSortColumns={setSortColumns}
                                dataGridColumns={dataGridColumns}
                                dispatchType={dispatchType} />
                        ) :
                            <>
                                <XLSFilterInReact
                                    dispatchType={dispatchType}
                                    finalRowsForOptions={finalRowsForOptions}
                                    memoizedWidth={memoizedWidth}
                                    column={column}
                                    rows={rows}
                                    onSortColumnsChange={onSortColumnsChange}
                                    sortColumns={sortColumns}
                                />

                            </>
                        }

                    </div>

                </div>
            ),

        };
    });
};




