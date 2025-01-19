/**
 * `CustomVerticalDataGrid` - A component for rendering a vertical data grid.
 * This component displays data in a table format with each row representing a data column.
 *
 * @component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.data - The data object to be displayed in the data grid.
 * @param {Array} props.dataColumn - The configuration for the columns of the data grid.
 * @param {string} [props.addCss=""] - Additional CSS classes to be applied to the table.
 * 
 * @returns {React.Element} - A table element representing the vertical data grid.
 *
 * @example
 * <CustomVerticalDataGrid
 *   data={{ id: 1, name: "John Doe" }}
 *   dataColumn={[{ key: "id", name: "ID" }, { key: "name", name: "Name", renderCell: ({ row }) => <strong>{row.name}</strong> }]} <STRONG ?!/>
 *   addCss="my-custom-css"
 * />
 */

import { dataRefs } from "@dataRefs/GlobalTextArray"

function CustomVerticalDataGrid({
    data,
    dataColumn,
    addCss,
}) {

    ////////////////
    //  Checks if there's data, this is more of a dev check
    if (!data) return <>pas de data</>
    if (!dataColumn) return <>pas de columns</>

    ////////////////
    //  JSX
    return (

        <table className={`w-full bg-white ${addCss ? addCss : ""}`}
            style={{ borderCollapse: 'collapse' }}>

            <tbody className={`data-grid-vertical`}>

                {dataColumn.map((column, index) => {

                    const value = data[column.key];
                    const renderCell = column.renderCell;

                    if (Object.keys(column).length === 0) {

                        return (
                            <tr className={`h-[3vh]`} key={`${column.key}-${index}`}>
                                <td className={`bg-primary-bg`} />
                                <td className={`bg-primary-bg`} />
                            </tr>
                        )
                    }

                    return (

                        <tr key={`${column.key}-${index}`}>

                            <td className={`p-1 ${column.addCss ? column.addCss : ""}`}>

                                {column.name ? column.name : dataRefs[column.key]}

                            </td>

                            <td className={`p-1 text-end`}>

                                {renderCell
                                    ? renderCell({ row: data })
                                    : value ? value : <>-</>
                                }

                            </td>

                        </tr>

                    );

                })}

            </tbody>

        </table>

    );
}

export default CustomVerticalDataGrid;