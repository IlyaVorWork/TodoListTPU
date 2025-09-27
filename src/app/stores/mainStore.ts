import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../../entities/user";

export const mainStore = configureStore({
  reducer: {
    user: userReducer
  },
})