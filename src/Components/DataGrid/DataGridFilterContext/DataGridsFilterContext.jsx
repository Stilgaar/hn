import { createContext, useContext, useMemo } from "react";
import { useReducer } from "react";
import { filterReducer } from "../DataGridStateManagement/filterState/filterReducer";

import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";
import { currentYear } from "@/Functions/formatingData";

export const FilterContext = createContext()

const initialFilterState = {
    dataGridFilters: {},
    [`${dataRefs.estimateDispatchType}_kanbanFilter`]: {
        [dataRefs.filerKeywords]: [currentYear, currentYear - 1],
        [dataRefs.endDate]: "",
        [dataRefs.startDate]: "",
    },
}

export const FilterContextProvider = ({ children }) => {

    const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState)

    const value = useMemo(() => ({ filterState, filterDispatch }), [filterState])

    return (

        <FilterContext.Provider value={value}>

            {children}

        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {

    const filterContext = useContext(FilterContext)
    return filterContext

}