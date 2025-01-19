import { useMemo } from "react";
import { useFilterContext } from "../DataGridFilterContext/DataGridsFilterContext";

const useGetFilters = ({ dispatchType, key }) => {

    const { filterState } = useFilterContext();

    // Memoize the path to the filters data
    const filtersFromGlobalState = useMemo(() => filterState?.dataGridFilters?.[dispatchType], [filterState?.dataGridFilters, dispatchType]);

    const filters = useMemo(() => filtersFromGlobalState?.[key] || [], [filtersFromGlobalState, key]);

    return { filters, filtersFromGlobalState };
};

export default useGetFilters;