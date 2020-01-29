import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CartItemType } from '../../types/uiTypes'

const CartItem = (props: CartItemType) => {

    return (
        <View style={styles.cartItem} >
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>{props.price}</Text>
                {props.deletable &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name={'ios-trash'} size={23} color="red" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginRight: 20
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
})

export default CartItem
