import { Fragment, useId } from "react";

import PaginationElement from "./PaginationElement";

function Pagination({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage
}) {

    const id = useId()

    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const maxPageNumbersToShow = 7; // Adjust this number as needed
    const pageNumbers = [];

    const firstPage = 1;
    const lastPage = totalPages;

    // Calculate half of the maximum page numbers to show
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    // Calculate the start and end pages
    let startPage = currentPage - halfMaxPageNumbersToShow;
    let endPage = currentPage + halfMaxPageNumbersToShow;

    // Adjust if startPage is less than 2
    if (startPage < 2) {
        endPage += (2 - startPage);
        startPage = 2;
    }

    // Adjust if endPage is greater than totalPages - 1
    if (endPage > totalPages - 1) {
        startPage -= (endPage - (totalPages - 1));
        endPage = totalPages - 1;
        if (startPage < 2) {
            startPage = 2;
        }
    }

    // Build the list of page numbers to display
    pageNumbers.push(firstPage);

    if (startPage > 2) {
        pageNumbers.push('ellipsis-prev');
    }

    for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
            pageNumbers.push(i);
        }
    }

    if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-next');
    }

    if (totalPages > 1) {
        pageNumbers.push(lastPage);
    }

    if (pageNumbers.length === 1) return

    ////////////////
    // JSX
    return (

        <div className={`flex justify-center gap-4`}>

            {currentPage !== 1 &&

                <PaginationElement
                    text={"Précédent"}
                    css={``}
                    width={`w-28 max-w-[80px]`}
                    handleClick={() => paginate(currentPage - 1)}
                />

            }

            {pageNumbers.map((number, index) => (

                <Fragment key={`${index}-${id}`}>

                    {number === 'ellipsis-prev' || number === 'ellipsis-next' ?


                        <PaginationElement
                            key={`ellipsis-${index}`}
                            text={'...'}
                            css={`pointer-events-none`}
                        />

                        :

                        <PaginationElement
                            key={number}
                            text={number}
                            css={`${currentPage === number ? "bg-grey-500 text-white" : ""
                                } `}
                            handleClick={() => paginate(number)}
                        />

                    }

                </Fragment>

            ))}

            {currentPage !== totalPages &&

                <PaginationElement
                    text={"Suivant"}
                    css={``}
                    width={`w-28 max-w-[80px]`}
                    handleClick={() => paginate(currentPage + 1)}
                />

            }

        </div>
    );
}

export default Pagination;
