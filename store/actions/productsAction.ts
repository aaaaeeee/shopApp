import { AppActions, SET_PRODUCTS, FETCH_PRODUCT } from '../../types/actions'
import { Product } from '../../types/product'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'


export const fetchProduct = (): ThunkAction<Promise<void>, {}, {}, AppActions> => {
    return async dispatch => {
        try {
            const response = await fetch('https://react-shop-app-538c6.firebaseio.com/products.json')
            const resData = await response.json()
            dispatch({
                type: 'SET_PRODUCTS',
                products: resData
            })
        } catch (err) {
            throw err;
        }

    }
}


export const deleteProduct = (id: string): AppActions => ({
    type: 'DELETE_PRODUCT',
    id
})

// export const addProduct = (product: Product): AppActions => ({
//     type: 'ADD_PRODUCT',
//     product
// })

export const editProduct = (product: Product): AppActions => ({
    type: 'EDIT_PRODUCT',
    product
})

export const addProduct = (product: Product): ThunkAction<Promise<void>, {}, {}, AppActions> => {
    return async dispatch => {
        const response = await fetch('https://react-shop-app-538c6.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    description: product.description
                })
            })
        const resData = await response.json()

        dispatch({
            type: 'ADD_PRODUCT',
            product
        })
    }
}
