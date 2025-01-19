////////////////
// DATAGRID FILTERS BEHAVIOURS

// Initialise DataGridFilters
export const initialiseDataGridFilters = (dataGridColumns, dispatchType) => {
    return { type: "INITIALISE_DATAGRID_FILTERS", payload: { dataGridColumns, dispatchType } }
}

// Reset filter List
export const resetFilterList = (dispatchType, key) => {
    return { type: "RESET_FILTER_LIST_DATAGRID_FILTERS", payload: { dispatchType, key } }
}

// ADD // DEL THE FILTERS
export const addDelFiltersDataGrid = (key, dispatchType, validOptions) => {
    return { type: "ADD_DEL_FILTERS_DATAGRID_FILTERS", payload: { key, dispatchType, validOptions } }
}

////////////////
// KANBAN BEHAVIOUR -WIP-

// Add a filter in kanban
export const addKanbanFilter = (dispatchType, element, key) => {
    return { type: "ADD_KANBAN_FILTER", payload: { dispatchType, element, key } }
}

// Delete a filter in kanban
export const deleteKanbanFilter = (dispatchType, index, key) => {
    return { type: "DELETE_KANBAN_FILTER", payload: { dispatchType, index, key } }
}

// Set  a date filter in kanban
export const setKanbanDates = (dispatchType, date, type) => {
    return { type: "SET_KANBAN_DATES", payload: { dispatchType, date, type } }
}
////////////////////////////////////////////////////////////////////////////////