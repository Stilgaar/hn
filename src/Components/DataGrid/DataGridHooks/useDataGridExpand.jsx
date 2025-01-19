import { useState, useCallback, useMemo } from "react";

const useDataGridExpand = ({ rows, parentGUIDName, row, GUID }) => {

    ////////////////
    // State for the expanse
    const [expandedRows, setExpandedRows] = useState(() => new Set());

    ////////////////
    // Toggle row expansion
    const toggleRowExpansion = useCallback((rowId) => {
        setExpandedRows(prev => {
            const newExpandedRows = new Set(prev);
            if (newExpandedRows.has(rowId)) {
                newExpandedRows.delete(rowId);
            } else {
                newExpandedRows.add(rowId);
            }
            return newExpandedRows;
        });
    }, []);


    // expansion of columns. Specific cases only, like in <Clients />
    const isExpanded = useMemo(() => { return expandedRows.has(row[GUID]) }, [expandedRows]);

    // Checks if the parent has children, so it 
    const hasChildren = useMemo(() => { return rows.some(r => r[parentGUIDName] === row[GUID]) }, [rows, parentGUIDName]);

    // Functions that toggles children and higlight selected rows. Note that for now, if there's a parenGuidName, the lightligt doenst work.
    const handleClickGrow = (rowId) => {
        parentGUIDName && toggleRowExpansion(rowId);
    };

    return { handleClickGrow, hasChildren, isExpanded }

}

export default useDataGridExpand;