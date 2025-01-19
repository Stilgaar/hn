/**
 * `CustomDataGrid` - A customizable data grid component with sorting, filtering, and pagination features.
 * This component handles rendering a table with dynamic columns and rows, providing functionalities like 
 * filtering, sorting, expanding rows, and pagination.
 *
 * @component
 * 
 * @param {Array} props.rows - The data rows to be displayed in the data grid, data fetched
 * @param {Array} props.dataGridColumns - The configuration for the columns of the data grid.
 * @param {string} props.GUID - Type of GUID to look for like devis_guid
 * @param {Function} props.setCurrentSearch - Function to set the current search results this is for the jsonToXls function.
 * @param {boolean} props.pending - Indicates if the data is still loading.
 * @param {string} props.parentGUIDName - The key for the parent GUID in each row, used for hierarchical data.
 * @param {string} props.title - The title of the data grid. Optional
 * @param {string} [props.addCss=""] - Additional CSS classes to be applied to the data grid container. Optional
 * @param {string} [props.hvMin=""] - CSS class for setting minimum height/width of the grid container. Optional
 * @param {string} props.lineHeight - CSS class for setting the line height of the rows. Optional
 * @param {string} [props.typeDataGrid=""] - Type of the data grid, used to apply specific CSS styles. Optional
 * @param {string} props.currentNav - The current navigation path.
 * @param {number} [props.ITEMSPERPAGEDATAGRID=500] - Number of items per page for pagination. set to 500 in datagridlayout pages
 * 
 * @returns {React.Element} - A table element representing the data grid with all functionalities.
 *
 * @example
 * <CustomDataGrid
 *   rows={[{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }]} // Fetched Data
 *   dataGridColumns={[{ key: "id", name: "ID" }, { key: "name", name: "Name" }]} // see the JSON files
 *   GUID="devis_guid"
 *   setCurrentSearch={(results) => console.log(results)} // SETS AFTER SEARCH DONE
 *   pending={false} // FROM FETCH
 *   parentGUIDName="parentGuid"
 *   title="User Data"
 *   addCss="my-custom-css"
 *   hvMin="min-height-500"
 *   lineHeight="line-height-1"
 *   typeDataGrid=""  CAN BE /// addPage /// params /// contact. If left blank, its a regular one
 *   currentNav="/users"
 *   ITEMSPERPAGEDATAGRID={100}
 * />
 */

// React Hooks. Arn't they almost all there ? 
import React, { useEffect, useMemo, useId, useRef, useState, useCallback } from 'react';

// import useStateContext from '@/Hooks/StateManagement/useStateContext';

// React Router Dom 6 inbuild Hooks
import { useParams, useNavigate } from 'react-router-dom';

// Hook to expand rows
import useDataGridExpand from './DataGridHooks/useDataGridExpand';

// Make the filters
import useDataGridMakeHeaders from './DataGridHooks/useDataGridMakeHeaders';

// Components that renders the cell, regulars and when there are subcells (like in rights)
import { DataGridCellRender, DataGridSubCellsRender } from './DataGridElements/DataGridCellRender';

// Personal Pagination Hook and Component
import usePagination from '@/Hooks/Common/usePaginate';
import Pagination from '../Navigation/NavigationElements/Pagination';

// simple components
import Title from '../Basic/Title';
// If the dataGrid is empty but still shows (when its not on the main page). Otherwise it goes to DataGridNoData to show a big text.
import { DataGridEmpty } from './DataGridElements/DataGridEmpty';

// Headers ? (obviously)
import DataGridFilterHeaders from './DataGridElements/DataGridFilterHeaders';
// filter rows
import DataGridFilterRows from './DataGridElements/DataGridFilterRows';

// Peronal CSS for the datagrid
import "../../css/customdatagrid/customdatagrid.css"

function CustomDataGrid({
    buisnessBase,
    rows,
    dataGridColumns,
    GUID,
    setCurrentSearch,
    pending,
    parentGUIDName,
    title,
    addCss = "",
    hvMin = "",
    lineHeight,
    typeDataGrid = "",
    currentNav,
    ITEMSPERPAGEDATAGRID = 500,
    dispatchType,
    width = "w-full",
    dataGridEmptyHeight,
    haveHeaders = true,
    oldData,
}) {

    ////////////////
    // Simple JSX when i missed something important while im setting stuff up
    if (!rows) return <>Manque les rows !</>
    if (!dataGridColumns) return <> Manque les "dataGridColumns" de render de colonnes</>
    if (!dispatchType) return <>Manque le "dispatchType", le composant en a besoin pour vivre (surtout les filtres)</>

    ////////////////
    // This is to go back to top when navigating between page numbers
    const containerRef = useRef(null);
    const toTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    };

    ////////////////
    // Id to map cleaner
    const id = useId()

    const [sortColumns, setSortColumns] = useState([]);

    const onSortColumnsChange = useCallback((sortColumns) => {
        if (sortColumns) {
            setSortColumns(sortColumns.slice(-1));
        }
    }, []);

    //////////////////
    // Functionnal Component from React Router Dom 6
    const nav = useNavigate()

    ////////////////
    // Make the headers filters filters.
    const {
        transformedDataGridColumns,
        finalRows,
        memoizedWidth,
    } = useDataGridMakeHeaders({ dataGridColumns, rows, parentGUIDName, dispatchType, setSortColumns, sortColumns, onSortColumnsChange })

    ////////////////
    // This is usef to change the color of the current selected row. useRef is used to avoir rerendering
    const currentlySelectedRowRef = useRef(null);

    ////////////////
    // Function to get the selected row (well change the css ya know)
    const handleRowSelection = (rowRef) => {
        if (currentlySelectedRowRef.current) {
            currentlySelectedRowRef.current.classList.remove('custom-data-grid-selectedrow');
        }
        if (rowRef && rowRef.current) {
            currentlySelectedRowRef.current = rowRef.current;
            currentlySelectedRowRef.current.classList.add('custom-data-grid-selectedrow');
        }
    };

    ////////////////
    // small error checker
    useEffect(() => {
        window.onerror = console.error;
    }, []);

    //////////////////
    // PAGIINATION
    // Hook to get the :pageination number
    const { pageNumber } = useParams()

    //////////////////
    // Function to change pages
    const paginate = useMemo(() => pageNumber => {
        toTop();
        nav(`${currentNav}/${pageNumber}`);
    }, [pageNumber])

    //////////////////
    // usePaginate personal hook to change pages
    const { currentPosts, currentPage, setCurrentPage, pages: numberOfPages } = usePagination(ITEMSPERPAGEDATAGRID, finalRows)

    //////////////////
    // Resets the current page to 1 when buisnessBase is changed
    useEffect(() => { setCurrentPage(1) }, [buisnessBase])

    //////////////////
    // useEffect to go to page 1 automaticly, triggers before the rendering is done. 
    useEffect(() => setCurrentPage(pageNumber === undefined ? 1 : parseInt(pageNumber)), [pageNumber, setCurrentPage, finalRows])

    ////////////////
    // final boss, final useeffect, this is to get the numbers in the TitleIcon (where the Title and the number is) but also to make the JSON => XLS button
    useEffect(() => {
        setCurrentSearch?.(finalRows)
        // eslint-disable-next-line 
    }, [finalRows])

    ////////////////
    // Reclusive tables Rows
    const CustomTableRow = ({
        row,
        dataGridColumns,
        GUID,
        rowIndex,
        lineHeight,
        level = 0,
    }) => {

        // Use refs to avoid rerenders. This is used for the change of color of the selected line
        const rowRef = useRef(null);

        // Personal hook to expand rows
        const { handleClickGrow, hasChildren, isExpanded } = useDataGridExpand({ rows, parentGUIDName, row, GUID })

        return (

            <>
                <tr ref={rowRef}
                    className={`trans-all-02 relative`}
                    style={{ width: "max-content" }}
                    onClick={() => handleRowSelection(rowRef)}>

                    {dataGridColumns?.map((column, dataGridColumnsIndex) => (

                        column.children ? (

                            // This occurs when the dataGridColumns have children inside them, like in the RIGHTS module.
                            // SO they're well set under the right "module type
                            <DataGridSubCellsRender
                                key={`${dataGridColumnsIndex}-${id}`}
                                column={column}
                                isLastRow={dataGridColumns.length - 1 === dataGridColumnsIndex}
                                row={row}
                                rowIndex={rowIndex} />
                        ) : (

                            // Else it renders normally according to this clas
                            <DataGridCellRender
                                key={`${dataGridColumnsIndex}-${id}`}
                                column={column}
                                rowIndex={rowIndex}
                                row={row}
                                oldData={oldData}
                                handleButtonExpandClick={() => handleClickGrow(row[GUID])}
                                hasChildren={hasChildren}
                                lineHeight={lineHeight}
                                dataGridColumnsIndex={dataGridColumnsIndex}
                                level={level}
                                isExpanded={isExpanded}
                                dispatchType={dispatchType}
                                memoizedWidth={memoizedWidth}
                            />
                        )
                    ))}

                </tr>

                {hasChildren
                    && isExpanded
                    && rows
                        ?.filter(child => child[parentGUIDName] === row[GUID])
                        .map((childRow, index) => (

                            <MemoizedCustomTableRow
                                key={`${index}-${id}`}
                                row={childRow}
                                dataGridColumns={dataGridColumns}
                                GUID={GUID}
                                level={level + 1}
                            />

                        ))}
            </>
        );
    }

    ////////////////
    // Memoisze component to avoir component useless rerenders
    const areEqual = (prevProps, nextProps) => {
        return prevProps.rowIndex === nextProps.rowIndex &&
            prevProps.lineHeight === nextProps.lineHeight &&
            prevProps.row === nextProps.row &&
            prevProps.rows === nextProps.rows
    }

    const MemoizedCustomTableRow = React.memo(CustomTableRow, areEqual);

    ////////////////
    // Specific css types checking
    const getTypeDataGridWrapperCss = (typeDataGrid === "params" || typeDataGrid === "addPage") ? "overflow-y-auto" : ""
    const getTypeDataGridContainerCss = (typeDataGrid === "params" || typeDataGrid === "addPage") ? "w-full" : `shadow  ${typeDataGrid === "contact" ? "w-full" : ""}`

    ////////////////
    // DataGrid JSX
    return (
        <>
            {!title ? null : <Title El={`h3`} css={`pl-2`}>{title}</Title>}

            <div ref={containerRef}
                className={`overflow-x-auto bg-white font-[13px] 
                            ${width} 
                            ${getTypeDataGridWrapperCss} 
                            ${addCss} 
                            ${hvMin}`}>

                <table className={`custom-data-grid-container relative ${getTypeDataGridContainerCss}`}>

                    <DataGridFilterHeaders
                        dataGridColumns={dataGridColumns}
                        transformedDataGridColumns={transformedDataGridColumns}
                        dispatchType={dispatchType}
                        memoizedWidth={memoizedWidth}
                        onSortColumnsChange={onSortColumnsChange}
                        haveHeaders={haveHeaders}
                    />

                    <DataGridFilterRows
                        rows={currentPosts}
                        dataGridColumns={dataGridColumns}
                        parentGUIDName={parentGUIDName}
                        dispatchType={dispatchType}
                        sortColumns={sortColumns}
                    >
                        {(finalRows) => (

                            <tbody className="w-max">

                                {!pending && finalRows?.length > 0 &&
                                    finalRows.map((row, rowIndex) => (

                                        <MemoizedCustomTableRow
                                            key={`${rowIndex}-${id}`}
                                            rowIndex={rowIndex}
                                            row={row}
                                            dataGridColumns={dataGridColumns}
                                            GUID={GUID}
                                            lineHeight={lineHeight}
                                        />

                                    ))
                                }

                                {!pending && (!finalRows || finalRows.length === 0) &&

                                    <DataGridEmpty
                                        colSpan={transformedDataGridColumns?.length || 1}
                                        dataGridEmptyHeight={dataGridEmptyHeight}
                                    />
                                }

                            </tbody>

                        )}

                    </DataGridFilterRows>

                </table>

            </div>

            {(typeDataGrid !== "addPage" && typeDataGrid !== "info" && typeDataGrid !== "params") &&

                <div className={`flex items-center justify-center`}>

                    <Pagination
                        postsPerPage={numberOfPages}
                        totalPosts={finalRows?.length}
                        paginate={paginate}
                        currentPage={currentPage} />

                </div>

            }

        </>

    );

}

export default CustomDataGrid;

// I Need theses classes for gulp go have them
// pl-1
// pl-2
// pl-3
// pl-4
// pl-5
// pl-6
// pl-7
// pl-8
// pl-9
// pl-10
// pl-11
