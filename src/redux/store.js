import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";


const store =  configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
        user: userReducer,
    },
});

export default store;