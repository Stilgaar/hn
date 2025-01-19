/**
 * `DataGridLongFileName` - A component for displaying shortened filenames in a data grid.
 * This component is designed to truncate long file names to a specified length for display in the `MyDataGrid` component.
 * It displays the shortened text, but retains the full text in a tooltip when hovered over.
 *
 * @component
 * 
 * @param {string} text - The full text of the file name to be displayed.
 * @param {number} [count=30] - The maximum number of characters to display in the shortened filename.
 *                             The default is 30 characters. If the file name is longer than this limit,
 *                             it will be truncated to this length.
 * 
 * @returns {React.Element} - A span element displaying the truncated text with the full text available as a tooltip.
 *
 * @example
 * <DataGridLongFileName
 *   text="example-of-a-very-long-filename-that-needs-to-be-shortened.txt"
 *   count={30}
 * />
 */

const TextWrap = ({ css, children }) => <span className={`group relative whitespace-nowrap ${css}`}> {children} </span>

function DataGridLongFileName({
    css = "",
    text,
    count = 30
}) {

    // if there is no text
    if (!text) return <TextWrap css={css}>-</TextWrap>

    // check if the text long
    const isLonger = text.length > count;

    // JSX if the text is longer than the count longer text
    if (!isLonger) return <TextWrap css={css}>{text}</TextWrap>;

    // JSX for longer text
    return <TextWrap css={css}>{text.substring(0, count)}...</TextWrap>;

}

export default DataGridLongFileName;