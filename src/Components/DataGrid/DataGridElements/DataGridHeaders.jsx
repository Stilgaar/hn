/**
 * `DataGridHeader`, `RenderMainHeaders`, and `RenderSubHeaders` - Components for rendering headers in a data grid.
 * 
 * These components handle the display of column headers, including sorting functionality and rendering of grouped columns with children.
 * 
 * * `DataGridHeader` - Displays the main column headers and handles sorting when a header is clicked.
 * * `RenderMainHeaders` - Displays the main headers when there are grouped columns with children, handling colspan for grouped columns.
 * * `RenderSubHeaders` - Displays the sub-headers for each child column under the grouped main headers.
 * 
 * @component
 * 
 * @param {Object} props - The props for the component.
 * @param {Array} props.transformedDataGridColumns - The configuration for the columns of the data grid after transformation.
 * @param {Function} [props.onSortColumnsChange] - Function to call when a header is clicked to change the sorting (only for `DataGridHeader`).
 * 
 * @returns {React.Element} - A table row element representing the headers of the data grid.
 *
 * @example
 * <DataGridHeader
 *   transformedDataGridColumns={[{ key: "id", name: "ID" }, { key: "name", name: "Name" }]}
 *   onSortColumnsChange={() => console.log('Sorting changed')}
 * />
 * 
 * <RenderMainHeaders
 *   transformedDataGridColumns={[
 *     { key: "group1", name: "Group 1", children: [{ key: "sub1", name: "Sub 1" }, { key: "sub2", name: "Sub 2" }] },
 *     { key: "group2", name: "Group 2" }
 *   ]}
 * />
 * 
 * <RenderSubHeaders
 *   transformedDataGridColumns={[
 *     { key: "group1", name: "Group 1", children: [{ key: "sub1", name: "Sub 1" }, { key: "sub2", name: "Sub 2" }] },
 *     { key: "group2", name: "Group 2" }
 *   ]}
 * />
 */

import { Fragment, useMemo } from "react";

import { dataRefs } from "@/JSONS/FrTexts/globalTexts";

import { findNextWidth } from "../DataGridFunctions/getRowWidth";

////////////////
// MAIN REGULAR HEADER
export const DataGridHeader = ({
    transformedDataGridColumns,
    onSortColumnsChange,
    memoizedWidth,
}) => {

    ////////////////
    //  JSX
    return (

        <tr className={`bg-white`} style={{ left: "100px" }}>

            {transformedDataGridColumns
                ?.map((column, transColIndex) => {

                    const { key, renderHeaderCell, name, freeze } = column

                    const findMemoisez = useMemo(() => findNextWidth(memoizedWidth, key), [memoizedWidth, key])

                    return (

                        <th key={`${column.key}-${transColIndex}`}
                            className={`text-xs ${freeze ? "freezed px-2 !z-[10000]" : ""}`}
                            style={{ left: freeze ? findMemoisez : "", top: 0 }}
                            onClick={() => onSortColumnsChange()}>

                            {renderHeaderCell

                                ?

                                renderHeaderCell({ column })

                                :

                                (name ? name : dataRefs[`${key}`])
                            }

                        </th>

                    )
                })}

        </tr>
    );
}

////////////////
// HEADER WHEN THERE'S REGROUPMENT WIH CHILDREN
// Adjusted function to render main headers using transformed columns
export const RenderMainHeaders = ({
    transformedDataGridColumns,
    memoizedWidth
}) => {

    ////////////////
    // JSX
    return (
        <>
            <tr>
                {transformedDataGridColumns &&
                    transformedDataGridColumns?.map((column, index) => {

                        if (column.children) {

                            return (

                                <Fragment key={`${column.key}-${index}`}>

                                    <th colSpan={column.children.length + 1}
                                        className={`text-xs text-center bg-grey-100`}
                                        style={{ width: "fit-content" }}>

                                        {column.renderHeaderCell
                                            ? column.renderHeaderCell({ column })
                                            : (column.name ? column.name : dataRefs[`${column.key}`])
                                        }

                                    </th>

                                </Fragment>
                            );

                        } else {


                            const { key, renderHeaderCell, name, freeze } = column

                            const findMemoisez = useMemo(() => findNextWidth(memoizedWidth, key), [memoizedWidth, key])

                            return (

                                <th key={key}
                                    className={`pl-2 text-xs ${freeze ? "freezed px-2 !z-[10000]" : ""}`}
                                    style={{ width: "fit-content", left: freeze ? findMemoisez : "", top: 0 }}>

                                    {renderHeaderCell
                                        ? renderHeaderCell({ column })
                                        : (name ? name : dataRefs[`${key}`])
                                    }

                                </th>
                            );
                        }
                    })}
            </tr>
        </>
    );
};

////////////////
// SUB HEADERS WITH THE CHILDREN
// Adjusted function to render sub-headers using transformed columns
export const RenderSubHeaders = ({
    transformedDataGridColumns,
    memoizedWidth
}) => {

    ////////////////
    //  JSX
    return (

        <tr>

            {transformedDataGridColumns &&
                transformedDataGridColumns?.reduce((acc, column, index) => {

                    const findMemoisez = useMemo(() => findNextWidth(memoizedWidth, column.key), [memoizedWidth, column.key])

                    if (column.children) {

                        return [...acc, ...column.children.map((child, i) => {

                            const isLast = column.children.length - 1 === i
                            const isLastRow = transformedDataGridColumns.length - 1 === index

                            return (

                                <Fragment key={`${child.key}-${index}`} >

                                    <th className={`customdatagrid-child-sub-headers text-xs`}>
                                        {child.name}
                                    </th>

                                    {isLast && !isLastRow &&

                                        <th className={`bg-separator-rights`}></th>

                                    }


                                </Fragment>
                            )
                        }

                        )];
                    }

                    // Empty cell for main headers without children
                    // ICI FAUT METTRE LE MEMOIZE ET LE FIXED POUR GARDER LA COLONNE AU BON ENDROIT
                    return [...acc,

                    <th key={`${column.key}-${index}`}
                        className={`bg-white  ${column.freeze ? "freezed px-2 !z-[10000]" : ""}`}
                        style={{ width: "fit-content", left: column.freeze ? findMemoisez : "", top: 0 }}>

                    </th>];

                }, [])
            }
        </tr>
    )

}


