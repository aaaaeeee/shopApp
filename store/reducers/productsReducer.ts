import PRODUCTS from '../../data/dummy-data';

import { Product } from '../../types/product'
import { ProductActionTypes, DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from '../../types/actions';

const productsReducerDefaultState = {
    availableProducts: [],
    userProducts: []
}

const productsReducer = (state = productsReducerDefaultState, action: ProductActionTypes) => {
    switch (action.type) {
        case SET_PRODUCTS:
            console.log('***OLAANKO täällä', action.products);
            const loadedProducts = []
            let product
            for (const key in action.products) {
                console.log('**key', key);
                product = {
                    id: key,
                    ownerId: 'u1',
                    title: action.products[key].title,
                    imageUrl: action.products[key].imageUrl,
                    price: action.products[key].price,
                    description: action.products[key].description
                }
                loadedProducts.push(product)
            }

            console.log('***', loadedProducts);

            return {
                ...state,
                availableProducts: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === 'u1')
            }

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
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.product.id
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = action.product;

            const availableProductIndex = state.availableProducts.findIndex(
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