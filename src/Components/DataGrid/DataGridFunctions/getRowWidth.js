export const getRowWidth = (rows, columns) => {

    if (!rows?.length || !columns?.length) return [];

    const SAMPLE_SIZE = 50; // Adjust this based on your needs
    const MIN_WIDTH = 110;
    const MAX_WIDTH = 500; // Set a maximum width to prevent excessive column widths

    // Function to calculate string length considering potential undefined values
    const safeLength = (str) => (str?.toString().length || 0);

    // Function to update max length
    const updateMaxLength = (current, newValue) => Math.min(Math.max(current, newValue), MAX_WIDTH / 12.5);

    return columns.map(column => {

        let { key, name, keyArray, secondKey, width } = column;

        // If column has a predefined width, return it immediately
        if (width) {
            return { name: key, width: `${Math.round(width)}px` };
        }

        let maxLength = safeLength(name);

        // Use a smaller sample of rows for large datasets
        const sampleRows = rows.length > SAMPLE_SIZE ? rows.slice(0, SAMPLE_SIZE) : rows;

        for (let i = 0; i < sampleRows.length; i++) {
            const row = sampleRows[i];

            if (Array.isArray(row[key])) {

                for (let j = 0; j < row[key].length; j++) {
                    const r = row[key][j];
                    let cellLength = safeLength(r[keyArray]);
                    if (secondKey) {
                        cellLength += safeLength(row[secondKey]);
                    }

                    maxLength = updateMaxLength(maxLength, cellLength);
                }

            } else {

                let getKey = key?.includes("guid") ? name : key || "test"

                let cellLength = safeLength(row[getKey]);

                if (secondKey) {
                    cellLength += safeLength(row[secondKey]);
                }
                maxLength = updateMaxLength(maxLength, cellLength);

            }
        }

        const multiplier = maxLength <= 12 ? 15.5 : 9.5;
        const calculateWidth = Math.min(Math.max(MIN_WIDTH, maxLength * multiplier), MAX_WIDTH);

        return { name: key, width: `${Math.round(calculateWidth)}px` };
    });
};

export const findNextWidth = (memoizedWidth, key) => {
    // If column has a width, return it with 'px'
    const currentIndex = memoizedWidth?.findIndex(elem => elem.name === key);

    if (currentIndex !== -1) {
        const totalWidth = memoizedWidth
            .slice(0, currentIndex)  // Get all columns before current index
            .reduce((sum, col) => {
                // Extract numeric value from width string (e.g., "133px" -> 133)
                const width = parseInt(col.width);
                return sum + width;
            }, 0);

        return `${totalWidth}px`;
    }

    return "1px";
}