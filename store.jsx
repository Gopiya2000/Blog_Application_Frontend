import { createStore, applyMiddleware } from "@reduxjs/toolkit"
import rootReducer from "./src/store/Reducers/rootReducer"
import thunk from "redux-thunk"

export const store = createStore(rootReducer, applyMiddleware(thunk));
