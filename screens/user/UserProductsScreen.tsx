import React from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { AppState } from "../../store/configureStore";
import ProductItem from "../../components/shop/ProductItem";
import { Product } from "../../types/product";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/productsAction";

const UserProductsScreen = props => {
  const userProducts: Product[] = useSelector(
    (state: AppState) => state.products.userProducts
  );
  const dispatch = useDispatch();
  const editItemHandler = id => {
    props.navigation.navigate("Edit", {
      productId: id
    });
  };
  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        }
      }
    ]);
  };

  return (
    <View>
      <FlatList
        data={userProducts}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={parseFloat(itemData.item.price)}
            onSelect={() => {
              editItemHandler(itemData.item.id);
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                editItemHandler(itemData.item.id);
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                deleteHandler(itemData.item.id);
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your products",
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
          title="Add"
          iconName={"ios-create"}
          onPress={() => {
            navData.navigation.navigate("Edit");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
