import usePagination from "../../hooks/usePagination";
import CustomPagination from '../Pagination/Pagination';

type Props <T> = {
    children: (list: Array<T>) => React.ReactNode, 
    list: Array<T>,
    defaultLimit?: number,
    displayedPage?: number
}
const PaginatedComponent = <T = any,>({children, list, defaultLimit = 10, displayedPage = 5} : Props<T>) => {
    const { handlePaginationChange, limit, page, pagesToShow, slicedList, total } = usePagination<T>({list, defaultLimit, displayedPage}); 

    return(
        <>
            {children(slicedList)}
            {list.length > 0 && <CustomPagination
                paginationData={{
                    limit: limit,
                    page: page,
                    total: total
                }}
                onPageRequest={handlePaginationChange}
                pagesToShow={pagesToShow}
                sx={
                    {
                        padding: '0',
                        '& .items-per-page-selector button': {
                            paddingLeft: 0,
                            height: '24px',
                        }
                    }
                }
            />}
        </>
    );
    
}
export default PaginatedComponent;