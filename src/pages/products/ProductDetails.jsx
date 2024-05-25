import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemById } from "../../redux/dataSlice";


const ProductDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const { selectedItem, singleProductStatus, error } = useSelector(state => state.data);

    
    useEffect(() => {
        if (singleProductStatus === 'idle') {
            dispatch(getItemById(itemId));
        }
    }, [singleProductStatus, itemId, dispatch])

    // TODO: loading and failed status set korte hobe
    if (singleProductStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (singleProductStatus === 'failed') {
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