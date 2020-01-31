import PRODUCTS from '../../data/dummy-data';

import { Product } from '../../types/product'
import { ProductActionTypes, DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT } from '../../types/actions';

const productsReducerDefaultState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = productsReducerDefaultState, action: ProductActionTypes) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.id
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.id
                )
            };
        case ADD_PRODUCT: {
            return {
                ...state,
                availableProducts: state.availableProducts.concat(action.product),
                userProducts: state.userProducts.concat(action.product)
            }
        }
        case EDIT_PRODUCT: {

            console.log('***REDCE', action.product.title);

            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.product.id
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = action.product;

            const availableProductIndex = state.userProducts.findIndex(
                prod => prod.id === action.product.id
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = action.product;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        }
        default:
            return state
    }
}

export { productsReducer }