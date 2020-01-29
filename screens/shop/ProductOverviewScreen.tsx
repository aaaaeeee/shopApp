import React from 'react'
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { Product } from '../../types/product';
import { AppState } from '../../store/configureStore';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cartAction'
import Colors from '../../constants/Colors';


const ProductsOverviewScreen = (props: any) => {
    const products: Product[] = useSelector((state: AppState) => state.products.availableProducts)
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: id,
                productTitle: title
            })
    }
    return <FlatList data={products} renderItem={itemData =>
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={parseFloat(itemData.item.price)}
            onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
            }}
            onAddToCart={() => {
                dispatch(addToCart(itemData.item))
            }}
        >
            <Button color={Colors.primary} title="View Details" onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
            }} />
            <Button color={Colors.primary} title="To Cart"
                onPress={() => { dispatch(addToCart(itemData.item)) }} />

        </ProductItem>
    } />
}
ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={'ios-menu'} onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Cart" iconName={'ios-cart'} onPress={() => { navData.navigation.navigate('Cart') }} />
        </HeaderButtons>)
    }

}

export default ProductsOverviewScreen