////////////////
// DATAGRID CHECKBOX BEHAVIOUR

// Set all checked
export const setAllCheckedDataGridFilter = ({ dispatchType, key, newCheckedSet }) => {
    return { type: "SET_ALL_CHECKED", payload: { dispatchType, key, newCheckedSet } }
}

// reset all checked
export const resetAllCheckedDataGridFilters = ({ dispatchType, key }) => {
    return { type: "RESET_CHECKED", payload: { dispatchType, key } }
}

// toggle all checked
export const toggleCheckedOptionDataGridFilters = ({ dispatchType, key, option }) => {
    return { type: 'TOGGLE_CHECKED', payload: { dispatchType, key, option } }
}

// Reset checked
export const initialiseDataGridChecked = () => { return { type: "RESET_ALL_CHEKED" } }