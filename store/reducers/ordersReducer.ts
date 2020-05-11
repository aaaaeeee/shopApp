import { AppState } from "../configureStore";

const ordersReducerDefaultState: Orders = {
  orders: [],
};

const ordersReducer = (
  state = ordersReducerDefaultState,
  action: AppState
): Orders => {
  switch (action.type) {
    case "ADD_ORDER":
    //   const newOrder: Order = {
    //     id: action.id,
    //     items: action.orders,
    //     totalAmount: action.totalAmount,
    //     date: action.date,
    //   };
    //   return { ...state, orders: state.orders.concat(newOrder) };
    case "FETCH_ORDERS":
      return action;
    //return { ...state, orders: state.orders.concat(action) };
    default:
      return state;
  }
};

export { ordersReducer };
