import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { addToCart } from '../../store/actions/cartAction'
import { Product } from '../../types/product'
import { AppState } from '../../store/configureStore'
import Colors from '../../constants/Colors'
interface Props {
    navigation: any
    price: number
}

const ProductDetailScreen = (props: Props) => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct: Product = useSelector((state: AppState) =>
        state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }}></Image>
            <View style={styles.action}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => { dispatch(addToCart(selectedProduct)) }} />
            </View>
            <Text style={styles.price}>{parseFloat(selectedProduct.price).toFixed(2)}€</Text>
            <Text style={styles.desc}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Cart" iconName={'ios-cart'} onPress={() => { navData.navigation.navigate('Cart') }} />
        </HeaderButtons>)
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    desc: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    action: {
        marginVertical: 10,
        alignItems: 'center',
        fontFamily: 'open-sans'
    }
})


export default ProductDetailScreen