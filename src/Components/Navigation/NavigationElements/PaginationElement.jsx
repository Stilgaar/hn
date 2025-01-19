/**
 * `PaginationElement` - A component for individual pagination buttons.
 * This component displays a button for navigating to a specific page or the next/previous page.
 *
 * @component
 * 
 * @param {Object} props - The props for the component.
 * @param {string|number} props.text - The text to display on the pagination button.
 * @param {string} props.css - The CSS classes to apply to the button.
 * @param {Function} props.handleClick - The function to call when the button is clicked.
 * 
 * @returns {React.Element} - A list item element representing a pagination button.
 *
 * @example
 * <PaginationElement
 *   text="1"
 *   css="bg-grey-light-7"
 *   handleClick={() => console.log('Page 1')}
 * />
 */

function PaginationElement({
    handleClick,
    css,
    text,
    width = 'w-10 max-w-[40px]',
}) {

    ////////////////
    // JSX
    return (

        <button className={`${css} ${width} relative mb-1 mt-1 align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  h-8 max-h-[30px] rounded-lg text-xs hover:bg-gray-900/10 active:bg-gray-900/20`}
            onClick={handleClick}>

            <span css={`text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`} >
                {text}
            </span>

        </button>

    );
}

export default PaginationElement; 