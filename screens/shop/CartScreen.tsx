import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store/configureStore'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import { removeFromCart } from '../../store/actions/cartAction'
import { addOrder } from '../../store/actions/ordersAction'
import Card from '../../components/UI/Card'
interface Props {

}

const CartScreen = (props: Props) => {
    const cartTotalAmount = useSelector((state: AppState) => state.cart.totalAmount)
    const cartItems = useSelector((state: AppState) => {
        let transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity
            })
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1)
    })
    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>{cartTotalAmount.toFixed(2)}</Text> </Text>
                <Button title="Order Now" color={Colors.accent} disabled={cartItems.length === 0} onPress={() => { dispatch(addOrder(cartItems, cartTotalAmount.toFixed(2))) }} />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        price={itemData.item.productPrice}
                        deletable
                        onRemove={() => { dispatch(removeFromCart(itemData.item.productId)) }}
                    />}
            />
        </View>

    )
}
CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }

})

export default CartScreen
