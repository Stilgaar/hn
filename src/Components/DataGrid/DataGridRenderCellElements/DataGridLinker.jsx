/**
 * `DataGridLinker` - A component for creating navigational links within a data grid.
 * This component wraps content (typically text or labels) in a React Router `Link` element, 
 * allowing for navigation to different routes within an application. It is specifically 
 * designed to work within the context of a data grid, where each cell might need to link to a different route.
 *
 * @component
 * 
 * @param {string} link - The base path for the link. This is the initial part of the URL to which the `guid` will be appended.
 * @param {React.ReactNode} children - The content to be wrapped inside the link. This is usually the text or label that the user clicks on.
 * @param {string} [guid=''] - An optional unique identifier that will be appended to the `link` path. 
 *                             This can be used to create dynamic URLs based on the data within the grid.
 * 
 * @returns {React.Element} - A React Router `Link` element wrapping the given `children` content, 
 *                            which navigates to the constructed URL on click.
 *
 * @example
 * 
 * <DataGridLinker
 *   link="/user/profile"
 *   guid="12345" />
 */

import { openInNewTab } from "@functions/misc";

function DataGridLinker({
    linkTo,
    children,
    guid = '',
    slug = '',
}) {
    const route = `${linkTo}/${guid}/${slug}`;

    ////////////////
    // JSX
    return (

        <a href={`${linkTo}/${guid}/${slug}`}
            onClick={(e) => openInNewTab(e, route)}
            rel="noopener noreferrer"
            className={`anchor-stay-black hover:text-primary-color-1-500`}>

            <div className={`td-under`}>

                {children}

            </div>

        </a>
    );
}

export default DataGridLinker;