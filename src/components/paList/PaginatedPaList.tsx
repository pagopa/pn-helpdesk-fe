import { Pa } from '../../api/apiRequestTypes';
import PaginatedComponent from '../paginatedComponent/PaginatedComponent';
import PaList from './PaList';

type Props = {
    items : Array<Pa>
}

const PaginatedPaList = ({items} : Props) => {
    return (
        <>
            <PaginatedComponent<Pa> list={items} defaultLimit={5} displayedPage={2}>
                {slicedList => (
                    <PaList items={slicedList} />
                )}
            </PaginatedComponent>
        </>
    );
}

export default PaginatedPaList;