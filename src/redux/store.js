import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import paymentReducer from "./paymentSlice"
import reviewSlice from "./reviewSlice";


const store =  configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        payment: paymentReducer,
        review: reviewSlice,
    },
});

export default store;