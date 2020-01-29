import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserScreen from '../screens/user/UserProductsScreen'
import EditScreen from '../screens/user/EditProductScreen'
import Colors from '../constants/Colors'

const defaultNaviOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? '' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNaviOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
},
    {
        defaultNavigationOptions: defaultNaviOptions
    }

)

const UserNavigator = createStackNavigator({
    User: UserScreen,
    Edit: EditScreen
},
    {
        defaultNavigationOptions: defaultNaviOptions
    }

)

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
}
)

export default createAppContainer(ShopNavigator)