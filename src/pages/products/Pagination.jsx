import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../redux/dataSlice';
import { useEffect } from 'react';

const Pagination = ({ gender, filters }) => {
    const dispatch = useDispatch();
    const { page, limit, totalPages, totalItems } = useSelector(state => state.data.pagination[gender]);

    useEffect(() => {
        dispatch(setPagination({ gender, page: 1, limit }));
    }, [dispatch, gender, limit, filters]);

    const handlePageChange = (newPage) => {
        dispatch(setPagination({ gender, page: newPage, limit }));
    };

    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value);
        const maxLimit = Math.min(newLimit, totalPages);
        dispatch(setPagination({ gender, page: 1, limit: maxLimit }));
    };

    return (
        <div className="pagination flex justify-center">
            {
                Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={page === index + 1 ? 'active w-6 h-6 text-white border border-black bg-black dark:text-black dark:border-white dark:bg-white mx-1' : ' w-6 h-6 border border-black dark:border-white mx-1'}>
                        {index + 1}
                    </button>
                ))
            }
            {
                totalPages > 1 &&
                <select value={limit} onChange={handleLimitChange} className=' bg-transparent border border-black dark:border-white h-6 mx-1 outline-none'>
                    {totalItems >= 6 && <option value={6} className="text-black">6</option>}
                    {totalItems >= 12 && <option value={12} className="text-black">12</option>}
                    {totalItems >= 18 && <option value={18} className="text-black">18</option>}
                    {totalItems >= 24 && <option value={24} className="text-black">24</option>}
                </select>
            }
        </div>
    );
};

export default Pagination;
