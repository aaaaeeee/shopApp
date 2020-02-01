import { Product } from "./product";
import { Cart } from "./cart";
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_ORDER = 'ADD_ORDER'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export interface SetProductsAction {
    type: typeof SET_PRODUCTS;
    products: Product[]
}

export interface SetFetching {
    type: 'FETCH_PRODUCT'
}
export interface DeleteProductAction {
    type: typeof DELETE_PRODUCT;
    id: string
}

export interface AddProductAction {
    type: typeof ADD_PRODUCT
    product: Product
}
export interface EditProductAction {
    type: typeof EDIT_PRODUCT
    product: Product
}
export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    product: Product
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART
    productId: string
}
export interface AddOrdersAction {
    type: typeof ADD_ORDER
    orders: any
    totalAmount: number
}

export type ProductActionTypes =
    SetProductsAction |
    AddToCartAction |
    RemoveFromCartAction |
    AddOrdersAction |
    DeleteProductAction |
    AddProductAction |
    EditProductAction |
    SetFetching

export type AppActions = ProductActionTypes