import { useEffect, useState } from "react";
import { PaginationData } from "../components/Pagination/types";
import { calculatePages } from "../helpers/pagination.utility";

export const DEFAULT_PAGINATION_LIMIT = 5;
const usePagination = (list : Array<any>, displayedPage : number = 2) => {
    const [paginationData, setPaginationData] = useState({page: 0, limit: DEFAULT_PAGINATION_LIMIT});
    const totalElements = list.length;

    // This function check wheter is needed to remove exceeding pages when from the props list are removed items. 
    useEffect(() => {
        let newTotal = list.length;
        if(newTotal > 0) {
            let maxPage = Math.ceil(newTotal / paginationData.limit);

            if((paginationData.page + 1) > maxPage)
                setPaginationData(state => {
                    return {...state, page: maxPage - 1};
                });
        }
    }, [list.length])

    const pagesToShow: Array<number> = calculatePages(
        paginationData.limit,
        totalElements,
        displayedPage,
        paginationData.page + 1
    );

    const handlePaginationChange = (event: PaginationData) => {
        setPaginationData(event);
    }

    const getSlicedList = () => {
        const {page, limit} = paginationData;
        let startIndex = 0, endIndex = 0;
        let delta = (page + 1) * limit;
        startIndex = delta - limit < 0 ? 0 : (delta - limit);
        endIndex = delta > totalElements ? totalElements : delta;
        return list.slice(startIndex, endIndex);
    }

    const slicedList = getSlicedList()

    return {
        page: paginationData.page, 
        limit: paginationData.limit, 
        pagesToShow, 
        handlePaginationChange, 
        slicedList, 
        total: totalElements
    }

};

export default usePagination;