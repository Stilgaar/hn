import { formatToDateForDisplay } from "@/Functions/formatingData";
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

export const computeFilteredRows = (
    rows,
    filters,
    dataGridColumns,
    noFilter = []
) => {

    if (!rows || rows.length === 0) return [];
    if (!filters) return []

    const noFilterSet = new Set(noFilter);

    // Create a Map for faster column lookups
    const columnMap = new Map();
    for (const column of dataGridColumns) {
        columnMap.set(column.key, column);
    }

    // Preprocess filters for efficient lookups
    const processedFilters = {};

    for (const [key, values] of Object.entries(filters)) {
        if (key === 'enabled' || noFilterSet.has(key)) continue;
        if (!values || values.length === 0 || values[0] === ' ') continue;

        const filterSet = new Set();
        let includesEmpty = false;

        for (const val of values) {
            if (val === dataRefs.empty) {
                includesEmpty = true;
            } else {
                filterSet.add(String(val).toLowerCase());
            }
        }

        processedFilters[key] = { filterSet, includesEmpty };
    }

    const checkRowAgainstFilters = (row) => {

        for (const key of Object.keys(processedFilters)) {

            const { filterSet, includesEmpty } = processedFilters[key];

            if (!filterSet.size && !includesEmpty) continue;

            const column = columnMap.get(key);

            let valueToCheck;

            // Compute valueToCheck based on column configuration
            if (column && column.secondKey && row[column.key] && row[column.secondKey]) {

                valueToCheck = `${row[column.key]} - ${row[column.secondKey]}`;

            } else if (column && column.keyArray && Array.isArray(row[column.key])) {

                valueToCheck = row[column.key].map(item => item[column.keyArray]);

            } else {

                valueToCheck = column && column.toCompare
                    ? row?.[key]?.[column.toCompare]
                    : (column.sortType === "date" ? formatToDateForDisplay(row?.[key]) : row?.[key]);

            }

            if (column && column.arrayLength) {
                if (Array.isArray(row[key])) {
                    if (!filterSet.has(String(row[key].length))) return false;
                } else {
                    return false;
                }
                continue; // Skip further checks for this key
            }

            const compareValues = Array.isArray(valueToCheck) ? valueToCheck : [valueToCheck];
            let match = false;

            // Handle the case when compareValues is an empty array
            if (compareValues.length === 0) {
                if (includesEmpty) {
                    match = true;
                } else {
                    match = false;
                }
            } else {
                for (const value of compareValues) {
                    if (
                        value == null ||
                        value === '' ||
                        typeof value === 'undefined' ||
                        (Array.isArray(value) && value.length === 0)
                    ) {
                        if (includesEmpty) {
                            match = true;
                            break;
                        }
                    } else {
                        const valueLower = String(value).toLowerCase();
                        if (filterSet.has(valueLower)) {
                            match = true;
                            break;
                        }
                    }
                }
            }

            if (!match) return false;

        }
        return true;
    };

    return rows.filter((row) => {
        if (checkRowAgainstFilters(row)) return true;
        return false;
    });
};
