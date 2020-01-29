import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer } from './reducers/productsReducer'
import { cartReducer } from './reducers/cartReducer'
import { ordersReducer } from "./reducers/ordersReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
});

export type AppState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, composeWithDevTools());