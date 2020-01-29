import { AppActions } from '../../types/actions'
import { Product } from '../../types/product'

export const setProducts = (products: Product[]): AppActions => ({
    type: 'SET_PRODUCTS',
    products
})

export const deleteProduct = (id: string): AppActions => ({
    type: 'DELETE_PRODUCT',
    id
})

export const addProduct = (product: Product): AppActions => ({
    type: 'ADD_PRODUCT',
    product
})

export const editProduct = (product: Product): AppActions => ({
    type: 'EDIT_PRODUCT',
    product
})