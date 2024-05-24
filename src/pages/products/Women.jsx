import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect } from "react";

const Women = () => {
    const dispatch = useDispatch();
    const { womenCollections, status } = useSelector(state => state.data)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(allData());
        }
    }, [status, dispatch]);

    
    return (
        <div>
            {
                womenCollections.length
            }
        </div>
    );
};

export default Women;