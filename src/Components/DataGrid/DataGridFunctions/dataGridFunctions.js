////////////////
// This function is used in <CustomDataGrid /> to initialise every column, thats present in the datagrid with an empty array. 

export const initializeFilters = (dataGridColumns, exclusionList = []) => {
    let initialFilters = {};

    // Initialize filters for all columns regardless of data presence
    dataGridColumns.forEach(column => {
        if (!exclusionList.includes(column.key) && !initialFilters.hasOwnProperty(column.key)) {
            initialFilters[column.key] = [];  // Initialize as empty array or provide a default value as needed
        }
    });

    return initialFilters;
};