import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { OrderItemType } from "../../types/uiTypes";
import CartItem from "../../components/shop/CartItem";
import Card from "../UI/Card";

const OrderItem = (props: OrderItemType) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.totalAmount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title="Show Details"
        onPress={() => {
          setShowDetails(!showDetails);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.cartItems.map((item) => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              title={item.productTitle}
              price={item.productPrice}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
