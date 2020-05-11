import { AppActions } from "../../types/actions";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
export const addOrder = (
  cartItems: any,
  totalAmount: number
): ThunkAction<Promise<void>, {}, {}, AppActions> => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://react-shop-app-538c6.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    const resData = await response.json();
    dispatch({
      type: "ADD_ORDER",
      orders: cartItems,
      totalAmount,
      id: resData.name,
      date: date,
    });
  };
};

export const fetchOrders = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AppActions
> => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://react-shop-app-538c6.firebaseio.com/orders/u1.json"
      );
      const resData = await response.json();

      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push({
          id: key,
          totalAmount: resData[key].totalAmount,
          date: new Date(resData[key].date).toISOString(),
          items: resData[key].cartItems,
        });
      }

      //console.log("***", loadedOrders);

      dispatch({
        type: "FETCH_ORDERS",
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};
