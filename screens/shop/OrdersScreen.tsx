import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { AppState } from "../../store/configureStore";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/ordersAction";
interface Props {}

const OrdersScreen = (props: Props) => {
  const orders: any[] = useSelector((state: AppState) => state.orders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <View>
      {orders && (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            console.log("**itemData*****", itemData);

            return (
              <OrderItem
                totalAmount={itemData.item.totalAmount}
                date={itemData.item.date}
                cartItems={itemData.item.items}
              />
            );
          }}
        />
      )}
    </View>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={"ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default OrdersScreen;
