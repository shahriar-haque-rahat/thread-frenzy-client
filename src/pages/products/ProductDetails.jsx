import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemById } from "../../redux/dataSlice";


const ProductDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const { selectedItem, status, error } = useSelector(state => state.data);

    console.log(itemId);
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getItemById(itemId));
        }
    }, [status, itemId, dispatch])

    // TODO: loading and failed status set korte hobe
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {
                selectedItem && (
                    <div>
                        <h1>{selectedItem.name}</h1>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetails;