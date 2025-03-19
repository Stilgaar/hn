import { useState, useMemo } from "react";
function usePagination(pages, data) {

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(pages)

    const indexOfLastPost = useMemo(() => currentPage * postPerPage, [currentPage, postPerPage]);
    const indexOfFirstPost = useMemo(() => indexOfLastPost - postPerPage, [indexOfLastPost, postPerPage]);
    const currentPosts = useMemo(() => data?.slice(indexOfFirstPost, indexOfLastPost), [data, indexOfFirstPost, indexOfLastPost]);

    return { currentPosts, currentPage, setCurrentPage, pages }
}

export default usePagination;

