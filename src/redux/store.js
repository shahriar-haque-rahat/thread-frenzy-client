import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";


const store =  configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
    },
});

export default store;