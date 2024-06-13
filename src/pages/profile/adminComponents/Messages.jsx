import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../redux/messageSlice";


const Messages = () => {
    const dispatch = useDispatch();
    const { messages, messagesStatus, messagesError } = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);


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
                <div>
                    {
                        messagesStatus === 'succeeded' && messages.length === 0
                            ? <p>No messages available.</p>
                            : messages.map(message => (
                                <div key={message.id} className="border p-4 mb-4">
                                    <div className=" flex gap-2 items-center">
                                        <h2 className="text-lg font-bold">{message.email}</h2>
                                        <p className=" text-xs">[{message.date.split('T')[0]}]</p>
                                    </div>
                                    <p>{message.message}</p>
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    );
};

export default Messages;
