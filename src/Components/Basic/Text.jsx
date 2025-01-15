/**
 * `Text` - A versatile text component for displaying and styling text content.
 * It supports customization through inline styles, CSS classes, and click event handling.
 * The component adapts to the current theme context for appropriate text styling.
 *
 * @component
 *
 * @param {string} text - The primary text content to be displayed.
 * @param {Object} [style={}] - Inline styles for customizing the text appearance.
 * @param {Function} [handle] - Callback function for click events on the text.
 * @param {React.Node} [children] - Additional content to be rendered alongside the text.
 * @param {string} [cssDiv=""] - CSS classes for an optional wrapping `div`.
 * @param {string} [css=""] - CSS classes for the text element itself.
 * @param {string} [textDark="text-white"] - CSS class for text styling in a dark theme.
 * @param {string} [textLight="text-black"] - CSS class for text styling in a light theme.
 * 
 * @returns {React.Element} - The rendered text component.
 *
 * @example
 * <Text text="Hello World" css="custom-class" handle={() => console.log('Text clicked')} />
 */


function Text({
    text,
    children,
    style,
    handleClickText,
    cssDiv = "",
    css = "",
    // textDark = "text-white",
    textLight = "text-black",
}) {

    if (!text && !children) return

    return (

        <>
            {cssDiv ?

                <div className={`${cssDiv}`} >

                    <p className={`${textLight} ${css}`}
                        onClick={handleClickText}
                        style={style}>

                        {children}
                        {text}

                    </p>

                </div>

                :

                <p className={`${textLight} ${css}`}
                    onClick={handleClickText}
                    style={style}
                >

                    {children}
                    {text}

                </p>

            }

        </>

    );
}

export default Text;