import {
    localeCompareFunc,
    numCompareFunc,
    dateCompareFunc,
    boolCompareFunc
} from "./sortingFunctions";

////////////////
// SORTING ROWS AFTER THE NAME FILTER
// Function to get the sortType based on the columnKey
const getSortTypeAndToCompare = (columnKey, dataGridColumns) => {
    const column = dataGridColumns.find(column => column.key === columnKey);
    return column ? { sortType: column.sortType, toCompare: column.toCompare } : { sortType: null };
};

export const computeFinalRows = (filteredRows, sortColumns, dataGridColumns) => {

    if (sortColumns.length === 0) return filteredRows;
    const { columnKey, direction } = sortColumns[0];

    // Get the sortType from dataGridColumns
    const { sortType, toCompare } = getSortTypeAndToCompare(columnKey, dataGridColumns);

    let sortedRows = [...filteredRows];

    switch (sortType) {

        // check the numbers
        case 'numCompare':
            sortedRows.sort((a, b) => numCompareFunc(a, b, columnKey, toCompare));
            break;

        // check the date
        case 'date':
            sortedRows.sort((a, b) => dateCompareFunc(a, b, columnKey));
            break;

        // check the booleans
        case 'bool':
            sortedRows.sort((a, b) => boolCompareFunc(a, b, columnKey, toCompare));
            break;

        // specificly : does nothing
        case 'none':
            return sortedRows;

        // default check, so i dont have to write 'localcompare' everywhere
        // same as in transformDataGridColumns.js
        default:
            sortedRows.sort((a, b) => localeCompareFunc(a, b, columnKey, toCompare));
            break;
    }

    return direction === 'DESC' ? sortedRows.reverse() : sortedRows;

};