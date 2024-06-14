import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import paymentReducer from "./paymentSlice"
import reviewSlice from "./reviewSlice";
import messageSlice from "./messageSlice";
import banUserSlice from "./banUserSlice";


const store = configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        payment: paymentReducer,
        review: reviewSlice,
        message: messageSlice,
        banUser: banUserSlice,
    },
});

export default store;