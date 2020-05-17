import React, { useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { signup, login } from "../../store/actions/authAction";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

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

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = () => {
    const user = {
      email: formState.inputValues.email,
      password: formState.inputValues.password,
    };
    if (isSignUp) {
      dispatch(signup(user));
    } else {
      dispatch(login(user));
    }
  };
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
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              onInputChange={inputChangeHandler}
              email
              initialValue=""
            ></Input>
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              onInputChange={inputChangeHandler}
              initialValue=""
              minLength={6}
            ></Input>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              ></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              ></Button>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
