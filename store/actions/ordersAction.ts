import { AppActions } from '../../types/actions'
export const addOrder = (cartItems, totalAmount): AppActions => ({
    type: 'ADD_ORDER',
    orders: cartItems,
    totalAmount
})