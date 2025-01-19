/**
 * `DataGridSubCellsRender` and `DataGridCellRender` - Components for rendering cells in a data grid.
 * 
 * These components handle the display of individual cells, including nested child cells and custom cell rendering.
 * 
 * * `DataGridSubCellsRender` - Renders the cells for the child columns within a parent column.
 * * `DataGridCellRender` - Renders a single cell, including custom rendering and styling.
 * 
 * @component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.column - The configuration for the current column.
 * @param {Object} props.row - The data object for the current row.
 * @param {number} props.rowIndex - The index of the current row.
 * @param {boolean} [props.hasChildren] - Indicates if the row has child rows (only for `DataGridCellRender`).
 * @param {string} [props.lineHeight] - CSS class for setting the line height of the cell (only for `DataGridCellRender`).
 * @param {number} [props.dataGridColumnsIndex] - The index of the current column (only for `DataGridCellRender`).
 * @param {number} [props.level] - The nesting level of the cell (only for `DataGridCellRender`).
 * 
 * @returns {React.Element} - A table cell element representing the cell in the data grid.
 *
 * @example
 * <DataGridSubCellsRender
 *   column={{ key: "group1", children: [{ key: "sub1", name: "Sub 1" }, { key: "sub2", name: "Sub 2" }] }}
 *   row={{ sub1: "Value 1", sub2: "Value 2" }}
 *   rowIndex={0}
 * />
 * 
 * <DataGridCellRender
 *   column={{ key: "name", name: "Name", renderCell: ({ row }) => <strong>{row.name}</strong> }}
 *   row={{ id: 1, name: "John Doe" }}
 *   rowIndex={0}
 *   hasChildren={false}
 *   lineHeight="line-height-1"
 *   dataGridColumnsIndex={1}
 *   level={0}
 * />
 */

// React inbuild hooks
import { useId, Fragment, useMemo } from "react";

import { findNextWidth } from "../DataGridFunctions/getRowWidth";

////////////////
// THIS IS THE CELL WHEN THERE IS A SUBCELL (LIKE IN RIGHTS)
export const DataGridSubCellsRender = ({
    column,
    row,
    rowIndex,
    isLastRow,
}) => {

    ////////////////
    // JSX
    return (

        <>
            {column.children.map((childColumn, index) => {

                ////////////////
                // cellData for readabilty && renderCell
                const cellChildData = row[childColumn.key];
                const isLast = (column.children.length) - 1 === index
                const { renderCell } = childColumn

                return (

                    <Fragment key={`${cellChildData}-${index}`}>

                        <td className={`customdatagrid-child-sub-cells text-xs`}
                            title={row?.[column?.key]?.toString()}
                            style={{ minWidth: "80px" }}>

                            {renderCell
                                ?
                                renderCell({ row, rowIndex })
                                :
                                cellChildData
                            }

                        </td>

                        {isLast && !isLastRow &&
                            <td className={`bg-separator-rights`}></td>
                        }

                    </Fragment>
                )

            })}

        </>

    )
}

////////////////
// THIS IS THE REGULAR CELL, USED EVERYWHERE (else)
export const DataGridCellRender = ({
    column,
    rowIndex,
    row,
    oldData,
    hasChildren,
    lineHeight,
    level,
    isExpanded,
    handleButtonExpandClick,
    dispatchType,
    memoizedWidth,
}) => {

    ////////////////
    // useId hook for the mapping
    const id = useId()

    ////////////////
    // Decomposition of the column, for readability
    const { cellClass, addCss, center, renderCell, freeze, button, key } = column

    const findMemoisez = useMemo(() => findNextWidth(memoizedWidth, key), [memoizedWidth, key])

    ////////////////
    // cellData for readabilty
    const cellData = row[key];

    ////////////////
    // JSX
    return (

        <td key={`${id}`}
            title={cellData?.toString()}
            className={`relative py-2 ${lineHeight ? lineHeight : ""} ${freeze ? "freezed" : ""}`}
            style={{ left: freeze ? findMemoisez : "" }}>

            <div className={`whitespace-nowrap w-full text-xs
                ${cellClass ? cellClass({ level }) : ''} 
                ${addCss ? addCss : ""} 
                ${center ? "centered row" : ""}`}>

                {renderCell
                    ? renderCell({ row, oldData, rowIndex, hasChildren, isExpanded, handleButtonExpandClick, dispatchType })
                    : (cellData ? cellData : (button ? "" : <>-</>))
                }


            </div>

        </td>

    )
}

// ${freeze ? "freeze" : ""}