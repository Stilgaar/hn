// React Hooks
import { useMemo, useCallback, useEffect, useRef } from "react"

// Personal Hook /
import { useFilterContext } from "../DataGridFilterContext/DataGridsFilterContext";

// Functionalities for the FILTERS and SORTING in the CustomDataGrid
// INITIALISE the filters depending on the datagridcolumns, so it sets whats possible
import { initializeFilters } from '../DataGridFunctions/dataGridFunctions';
import { initialiseDataGridFilters } from "../DataGridStateManagement/filterState/filterDispatch";
// CREATES the Excel like modals for the search purpose.
import { transformDataGridColumns } from '../DataGridFunctions/transformDataGridColumns ';
// FILTERS the rows
import { computeFilteredRows } from '../DataGridFunctions/computeFilteredRows';
// SORTS alphabetically or whatever you choose to sort by
import { computeFinalRows } from '../DataGridFunctions/computeFinalrows';
// MAKES the row width depending on the text size
import { getRowWidth } from "../DataGridFunctions/getRowWidth";

const useDataGridMakeHeaders = ({
    dataGridColumns,
    rows,
    parentGUIDName,
    dispatchType,
    setSortColumns,
    sortColumns,
    onSortColumnsChange
}) => {

    const { filterDispatch, filterState } = useFilterContext()

    const initializeRef = useRef(false)
    const filtersFromGlobalState = useMemo(() => filterState?.dataGridFilters?.[dispatchType], [filterState?.dataGridFilters?.[dispatchType]])

    ////////////////
    // Check if filters are on or off to get the finalRows corrected
    const areFiltered = useMemo(() => filtersFromGlobalState && Object.values(filtersFromGlobalState)?.some(filter => filter.length > 0), [filtersFromGlobalState])

    const handleResetAllHeaders = useCallback(() => {
        filterDispatch(initialiseDataGridFilters(dataGridColumns, dispatchType))
    }, [dataGridColumns, dispatchType])

    useEffect(() => {
        if (!initializeRef.current && !areFiltered) {
            handleResetAllHeaders()
            initializeRef.current = true
        }
    }, [])

    ////////////////
    // Memoisze the column width to make it compute only once
    const memoizedWidth = useMemo(() => getRowWidth(rows, dataGridColumns), [rows, dataGridColumns]);

    ////////////////
    // Use the filters
    const filteredRows = useMemo(() =>
        computeFilteredRows(rows, filtersFromGlobalState, dataGridColumns, parentGUIDName)
        , [rows, filtersFromGlobalState, dataGridColumns, parentGUIDName]);

    ////////////////
    // Only include rows that do not have a parent (top-level rows)
    const topLevelRows = useMemo(() => {
        if (parentGUIDName) return rows.filter(row => !row[parentGUIDName])
        else return rows
    }, [rows, parentGUIDName]);

    // for regular dataGrids
    const finalRows = useMemo(() =>
        areFiltered
            ? computeFinalRows(filteredRows, sortColumns, dataGridColumns)
            : computeFinalRows(topLevelRows, sortColumns, dataGridColumns)
        , [topLevelRows, sortColumns, dataGridColumns, filteredRows, areFiltered]);

    // for clients datagrid (with children)
    const finalRowsForOptions = useMemo(() =>
        areFiltered
            ? computeFinalRows(filteredRows, sortColumns, dataGridColumns)
            : computeFinalRows(rows, sortColumns, dataGridColumns) // Use 'rows' instead of 'topLevelRows'
        , [rows, sortColumns, dataGridColumns, filteredRows, areFiltered]);

    // Final Transformation for the headers, also build them (jsx inside the function)
    const transformedDataGridColumns = useMemo(() =>
        transformDataGridColumns({
            dataGridColumns,
            rows,
            finalRowsForOptions,
            onSortColumnsChange,
            sortColumns,
            setSortColumns,
            memoizedWidth,
            initializeFilters,
            dispatchType,
            handleResetAllHeaders,
        })
        , [dataGridColumns, rows, finalRowsForOptions, onSortColumnsChange, sortColumns,]);

    return {
        finalRows,
        transformedDataGridColumns,
        memoizedWidth,
        handleResetAllHeaders
    }

}

export default useDataGridMakeHeaders;