import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

const initializeFilters = (dataGridColumns) => {
    const initialFilters = {};
    for (const column of dataGridColumns) {
        if (!Object.prototype.hasOwnProperty.call(initialFilters, column.key)) {
            // Initialize as empty array; adjust if default values are needed
            initialFilters[column.key] = [];
        }
    }
    return initialFilters;
};

export const filterReducer = (prevState, action) => {

    console.log("FILTERREDUCER.JS : ", action.type)

    switch (action.type) {

        ///////////////
        // DATAGRID FILTERS BEHAVIOURS

        // INTITIALISE THE FILTERS IN DATA GRID
        case "INITIALISE_DATAGRID_FILTERS": {
            const { dataGridColumns, dispatchType } = action.payload;

            return {
                ...prevState,
                dataGridFilters: {
                    ...prevState.dataGridFilters,
                    [dispatchType]: initializeFilters(dataGridColumns)
                },
                dataGridCheked: {}
            };
        }

        // Reset filter lists
        case "RESET_FILTER_LIST_DATAGRID_FILTERS": {
            const { dispatchType, key, } = action.payload

            return {
                ...prevState,
                dataGridFilters: {
                    ...prevState.dataGridFilters,
                    [dispatchType]: {
                        ...prevState.dataGridFilters[dispatchType],
                        [key]: new Set()
                    }
                }
            }
        }

        // ADD // DEL THE FILTERS
        case "ADD_DEL_FILTERS_DATAGRID_FILTERS": {
            const { validOptions, key, dispatchType } = action.payload

            return {
                ...prevState,
                dataGridFilters: {
                    ...prevState.dataGridFilters,
                    [dispatchType]: {
                        ...prevState.dataGridFilters[dispatchType],
                        [key]: validOptions
                    }
                }
            }
        }


        ///////////////
        // KANBAN FILTERS BEHAVIOURS

        // Add one word
        case "ADD_KANBAN_FILTER": {

            const { dispatchType, element, key } = action.payload

            const state = [...prevState[`${dispatchType}_kanbanFilter`][key]];
            state.push(element)

            return {
                ...prevState,
                [`${dispatchType}_kanbanFilter`]: {
                    ...prevState[`${dispatchType}_kanbanFilter`],
                    [key]: state
                }
            }
        }

        // Add delete one word
        case "DELETE_KANBAN_FILTER": {

            const { dispatchType, index, key } = action.payload

            const state = [...prevState[`${dispatchType}_kanbanFilter`][key]];

            state.splice(index, 1)

            return {
                ...prevState,
                [`${dispatchType}_kanbanFilter`]: {
                    ...prevState[`${dispatchType}_kanbanFilter`],
                    [key]: state
                }
            }
        }

        // set the dates
        case "SET_KANBAN_DATES": {
            const { dispatchType, date, type } = action.payload

            const state = { ...prevState[`${dispatchType}_kanbanFilter`] };

            if (type === "start") {
                state[dataRefs.startDate] = date
            }

            if (type === "end") {
                state[dataRefs.endDate] = date
            }

            return {
                ...prevState,
                [`${dispatchType}_kanbanFilter`]: state
            }
        }

        ////////////////
        // DEFAULT WARNING !!
        default:
            console.warn(`Hi, Jeff, Vsauc\n You Should not have a warning here \n You either wrote a dispatch without writing it in the switch case from 'filterReducer.js' or you did a (nasty) spelling mistake.`)
            return prevState
    }

}