import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { AppState } from "../../store/configureStore";
import { Product } from "../../types/product";

import { addProduct, editProduct } from "../../store/actions/productsAction";
import Input from "../../components/UI/Input";

const FORM_UPDATE = "FORM_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const productId = props.navigation.getParam("productId");
  const editedProduct: Product = useSelector((state: AppState) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay!" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Check teh errors", [{ text: "Okay" }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        const updatedProduct = {
          id: editedProduct.id,
          ownerId: editedProduct.ownerId,
          price: editedProduct.price,
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          description: formState.inputValues.description,
        };
        await dispatch(editProduct(updatedProduct));
      } else {
        const newProduct = {
          ownerId: "u1",
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          price: formState.inputValues.price,
          description: formState.inputValues.description,
        };
        await dispatch(addProduct(newProduct));
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: "FORM_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              onInputChange={inputChangeHandler}
              required
              initiallyValid={!!editedProduct}
            />
          )}
          <Input
            id="description"
            label="Description"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunction = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    // headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item title="Menu" iconName={'ios-menu'} onPress={() => { navData.navigation.toggleDrawer() }} />
    // </HeaderButtons>),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={"ios-checkmark"}
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
