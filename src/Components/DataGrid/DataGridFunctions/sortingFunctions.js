// Helper function to extract values
const getValue = (obj, columnKey, toCompare) => {
    return toCompare ? obj[columnKey]?.[toCompare] ?? null : obj[columnKey] ?? null;
};

// Locale compare function
export const localeCompareFunc = (a, b, columnKey, toCompare) => {
    const aValue = getValue(a, columnKey, toCompare);
    const bValue = getValue(b, columnKey, toCompare);

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    const aStr = String(aValue);
    const bStr = String(bValue);

    return aStr.localeCompare(bStr);
};

// Numeric compare function
export const numCompareFunc = (a, b, columnKey, toCompare) => {
    const aValue = Number(getValue(a, columnKey, toCompare));
    const bValue = Number(getValue(b, columnKey, toCompare));

    if (isNaN(aValue) && isNaN(bValue)) return 0;
    if (isNaN(aValue)) return 1;
    if (isNaN(bValue)) return -1;

    return aValue - bValue;
};

// Date compare function
export const dateCompareFunc = (a, b, columnKey, toCompare) => {
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [day] = dateString.split(' / ');
        return new Date(day);
    };

    const aValue = parseDate(getValue(a, columnKey, toCompare));
    const bValue = parseDate(getValue(b, columnKey, toCompare));

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return aValue - bValue;
};

// Boolean compare function
export const boolCompareFunc = (a, b, columnKey, toCompare) => {
    const aValue = Boolean(getValue(a, columnKey, toCompare));
    const bValue = Boolean(getValue(b, columnKey, toCompare));

    if (aValue === bValue) return 0;
    return aValue ? -1 : 1;
};