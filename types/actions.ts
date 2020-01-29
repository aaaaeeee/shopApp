import { Product } from "./product";
import { Cart } from "./cart";

export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_ORDER = 'ADD_ORDER'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export interface SetProductsAction {
    type: typeof SET_PRODUCTS;
    products: Product[]
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
    EditProductAction

export type AppActions = ProductActionTypes