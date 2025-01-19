import { memo, useMemo } from 'react';
import { computeFilteredRows } from '../DataGridFunctions/computeFilteredRows';
import { computeFinalRows } from '../DataGridFunctions/computeFinalrows';
import useGetFilters from '../DataGridHooks/useGetFilters';

const DataGridFilterRows = memo(({
    rows,
    dataGridColumns,
    parentGUIDName,
    dispatchType,
    sortColumns,
    children
}) => {

    if (rows && !rows.length) return

    const { filtersFromGlobalState } = useGetFilters({ dispatchType });

    // Check if any filters are active
    const areFiltered = useMemo(() =>
        filtersFromGlobalState && Object.values(filtersFromGlobalState)?.some(filter => filter.length > 0),
        [filtersFromGlobalState]
    );

    // Filter rows based on active filters
    const filteredRows = useMemo(() =>
        computeFilteredRows(rows, filtersFromGlobalState, dataGridColumns, parentGUIDName),
        [rows, filtersFromGlobalState, dataGridColumns, parentGUIDName]
    );

    // Get top-level rows when using hierarchical data
    const topLevelRows = useMemo(() => {
        if (parentGUIDName) return rows.filter(row => !row[parentGUIDName]);
        return rows;
    }, [rows, parentGUIDName]);

    // Compute final rows with sorting applied
    const finalRows = useMemo(() =>
        areFiltered
            ? computeFinalRows(filteredRows, sortColumns, dataGridColumns)
            : computeFinalRows(topLevelRows, sortColumns, dataGridColumns),
        [topLevelRows, sortColumns, dataGridColumns, filteredRows, areFiltered]
    );

    return children(finalRows);
});

export default DataGridFilterRows;