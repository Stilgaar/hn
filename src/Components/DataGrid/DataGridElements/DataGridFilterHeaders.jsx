import { memo } from 'react';
import { OptionsVisibilityProvider } from '../DataGridFilterContext/VisilibityContext';
import { RenderMainHeaders, RenderSubHeaders, DataGridHeader } from './DataGridHeaders';

const DataGridFilterHeaders = memo(({
    dataGridColumns,
    transformedDataGridColumns,
    handleResetAllHeaders,
    dispatchType,
    memoizedWidth,
    onSortColumnsChange,
    haveHeaders
}) => {

    return (

        <OptionsVisibilityProvider>

            <thead className="!z-[10001] w-max">

                {dataGridColumns
                    ?.some(column => column.children && column.children.length > 0) ? (

                    <>
                        <RenderMainHeaders
                            memoizedWidth={memoizedWidth}
                            transformedDataGridColumns={transformedDataGridColumns}
                            dispatchType={dispatchType} />

                        <RenderSubHeaders
                            memoizedWidth={memoizedWidth}
                            handleResetAllHeaders={handleResetAllHeaders}
                            transformedDataGridColumns={transformedDataGridColumns}
                            dispatchType={dispatchType} />
                    </>

                ) : (

                    <>

                        {haveHeaders && (

                            <DataGridHeader
                                handleResetAllHeaders={handleResetAllHeaders}
                                dispatchType={dispatchType}
                                memoizedWidth={memoizedWidth}
                                onSortColumnsChange={onSortColumnsChange}
                                transformedDataGridColumns={transformedDataGridColumns}
                            />

                        )}

                    </>

                )}

            </thead>

        </OptionsVisibilityProvider>
    );
});

export default DataGridFilterHeaders;