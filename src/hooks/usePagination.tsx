import { useEffect, useState } from 'react';
import { PaginationData } from '../components/Pagination/types';
import { calculatePages } from '../helpers/pagination.utility';

export const DEFAULT_PAGINATION_LIMIT = 10;
export const DEFAULT_DISPLAYED_PAGE = 2;

type Props<T> = {
  list: Array<T>;
  displayedPage?: number;
  defaultLimit?: number;
};
const usePagination = <T = any,>({
  list,
  displayedPage = DEFAULT_DISPLAYED_PAGE,
  defaultLimit = DEFAULT_PAGINATION_LIMIT,
}: Props<T>) => {
  const [paginationData, setPaginationData] = useState({ page: 0, limit: defaultLimit });
  const totalElements = list.length;

  // This function check wheter is needed to remove exceeding pages when from the props list items are removed.
  useEffect(() => {
    const newTotal = list.length;
    if (newTotal > 0) {
      const maxPage = Math.ceil(newTotal / paginationData.limit);

      if (paginationData.page + 1 > maxPage) {
        setPaginationData((state) => ({ ...state, page: maxPage - 1 }));
      }
    }
  }, [list.length, paginationData.page, paginationData.limit]);

  const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    totalElements,
    displayedPage,
    paginationData.page + 1
  );

  const handlePaginationChange = (event: PaginationData) => {
    setPaginationData(event);
  };

  const getSlicedList = () => {
    const { page, limit } = paginationData;
    let startIndex = 0;
    let endIndex = 0;
    const delta = (page + 1) * limit;
    startIndex = delta - limit < 0 ? 0 : delta - limit;
    endIndex = delta > totalElements ? totalElements : delta;
    return list.slice(startIndex, endIndex);
  };

  const slicedList = getSlicedList();

  return {
    page: paginationData.page,
    limit: paginationData.limit,
    pagesToShow,
    handlePaginationChange,
    slicedList,
    total: totalElements,
  };
};

export default usePagination;
