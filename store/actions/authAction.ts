import { AppActions } from "../../types/actions";
import { Product } from "../../types/product";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SignUp, LogIn } from "../../types/auth";
export const signup = (
  signup: SignUp
): ThunkAction<Promise<void>, {}, {}, AppActions> => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: signup.email,
          password: signup.password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    console.log("**RESP", resData);
    dispatch({
      type: "SIGN_UP",
      signup,
    });
  };
};

export const login = (
  login: LogIn
): ThunkAction<Promise<void>, {}, {}, AppActions> => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    console.log("**LOGIN", resData);
    dispatch({
      type: "LOGIN",
      login,
    });
  };
};
