import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, setCurrentPage } from "../../../redux/messageSlice";
import DashboardPagination from "../DashboardPagination";

const Messages = () => {
    const dispatch = useDispatch();
    const { messages, messagesStatus, messagesError, totalPages, currentPage, totalItems } = useSelector(state => state.message);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    useEffect(() => {
        const filters = {
            page: currentPage,
            limit: 6,
        };
        dispatch(getMessages(filters));
    }, [dispatch, currentPage]);

    if (messagesStatus === 'failed') {
        return <div>Error: {messagesError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Messages | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-10 mr-2 md:mr-0">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Messages</h1>


                {
                    messagesStatus === 'succeeded' && messages.length === 0
                        ? <p className=" mt-10 text-center">No data found</p>
                        : <>
                            <div>
                                {messages.map(message => (
                                    <div key={message._id} className="border p-4 mb-4">
                                        <div className="flex gap-2 items-center">
                                            <h2 className="text-lg font-bold">{message.email}</h2>
                                            <p className="text-xs">[{new Date(message.date).toLocaleDateString()}]</p>
                                        </div>
                                        <p>{message.message}</p>
                                    </div>
                                ))}
                            </div>
                            <DashboardPagination totalItems={totalItems} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                        </>
                }
            </div>
        </>
    );
};

export default Messages;
