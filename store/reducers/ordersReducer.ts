import { AppState } from "../configureStore";

const ordersReducerDefaultState: Orders = {
    orders: [],
}

const ordersReducer = (state = ordersReducerDefaultState, action: AppState): Orders => {
    switch (action.type) {
        case 'ADD_ORDER':
            const newOrder: Order = {
                id: new Date().getTime().toString(),
                items: action.orders,
                totalAmount: action.totalAmount,
                date: new Date().toLocaleDateString('fi-FI'),
            }
            return { ...state, orders: state.orders.concat(newOrder) };

        default:
            return state;
    }
}

export { ordersReducer }