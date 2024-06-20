import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const DashboardPagination = ({ currentPage, totalPages, handlePageChange }) => {


    return (
        <div>
            {
                totalPages === 0 ? <div></div>
                    : <div className="flex justify-center mt-4">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? " px-4 py-2 border bg-gray-200 text-black" : "px-4 py-2 border"}>
                            <RiArrowLeftSLine size={20} />
                        </button>

                        <span className="px-4 py-2 w-32 text-center">{`Page ${currentPage} of ${totalPages}`}</span>

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? " px-4 py-2 border bg-gray-200 text-black" : "px-4 py-2 border"}>
                            <RiArrowRightSLine size={20} />
                        </button>
                    </div>
            }
        </div>
    );
};

export default DashboardPagination;