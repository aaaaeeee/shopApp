import { AppActions } from '../../types/actions'
import { Product } from '../../types/product'

export const addToCart = (product: Product): AppActions => ({
    type: 'ADD_TO_CART',
    product
})

export const removeFromCart = (productId: string): AppActions => ({
    type: 'REMOVE_FROM_CART',
    productId
})