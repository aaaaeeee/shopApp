import { Cart } from '../../types/cart'
import { AppState } from '../configureStore';

const cartReducerDefaultState: Cart = {
  items: {},
  totalAmount: 0
}

const cartReducer = (state = cartReducerDefaultState, action: AppState) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const addedProduct = action.product;
      const prodPrice = parseFloat(addedProduct.price);
      const prodTitle = addedProduct.title;

      let newItem: any
      if (state.items[addedProduct.id]) {
        newItem = {
          quantity: state.items[addedProduct.id].quantity + 1,
          productPrice: prodPrice,
          productTitle: prodTitle,
          sum: prodPrice + state.items[addedProduct.id].productPrice,
        }
      } else {
        newItem = {
          quantity: 1,
          productPrice: prodPrice,
          productTitle: prodTitle,
          sum: prodPrice
        }
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newItem },
        totalAmount: state.totalAmount + prodPrice
      }
    case 'REMOVE_FROM_CART':
      const currentQty = state.items[action.productId].quantity
      const productPrice = state.items[action.productId].productPrice
      const productTitle = state.items[action.productId].productTitle

      let updatedCartItems: any
      if (currentQty > 1) {
        const updatedCartItem = {
          quantity: currentQty - 1,
          productPrice: productPrice,
          productTitle: productTitle
        }
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.productId]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - state.items[action.productId].productPrice,
      }
    case 'ADD_ORDER':
      return cartReducerDefaultState
    case 'DELETE_PRODUCT':
      if (!state.items[action.id]) {
        return state;
      }
      const itemTotal = state.items[action.id].productPrice
      const updatedItems = { ...state.items };
      delete updatedItems[action.id]

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
    default:
      return state
  }
}

export { cartReducer }