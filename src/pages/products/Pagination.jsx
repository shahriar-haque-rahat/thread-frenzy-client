

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            {pages.map(page => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-1 ${page === currentPage ? 'bg-black text-white' : 'bg-gray-300'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
