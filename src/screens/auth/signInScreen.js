import React, { useEffect, useState, useContext } from "react";
import { validateAll } from "indicative/validator";
import {
  View,
  Text,
  Image,
  Keyboard,
  Alert,
  BackHandler,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Input,
  Card,
  FormValidationMessage,
  Button,
} from "react-native-elements";

import { AuthContext } from "../../utils/authContext";
import { Api } from "../../utils/Api";
import Spinner from "react-native-loading-spinner-overlay";

const SignInScreen = ({ navigation }) => {
  useEffect(() => {
    //Api.GET("todos/2").then((result) => console.log(result));
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [emailAddress, setemailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [SignUpErrors, setSignUpErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const { signIn, signUp } = useContext(AuthContext);

  const handleSignIn = () => {
    const rules = {
      email: "required|email",
      password: "required|string|min:6|max:40",
    };

    const data = {
      email: emailAddress,
      password: password,
    };

    const data2 = {
      username: "admin",
      password: "admin12",
    };

    const messages = {
      required: (field) => `${field} is required`,
      "email.email": "Please enter a valid email address",
      "password.min": "Password should be atleast 6 characters long",
    };

    validateAll(data, rules, messages)
      .then(() => {
        Keyboard.dismiss();
        setSignUpErrors({});
        setLoading(true);
        Api.POST("auth/login", data).then((response) => {
          //console.log(response);
          setLoading(false);
          if (response.statusCode>=400) {
            Alert.alert("Sorry!",response.errorMessage);
          } else {
            signIn( response );
          }
        });
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          formatError[err.field] = err.message;
        });
        setSignUpErrors(formatError);
      });
  };

  return (
    <View style={{ backgroundColor: "#30313120", flex: 1 }}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../images/zepcom.png")}
          style={{ width: 140, height: 140, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Email"}
            placeholder="Enter Email"
            value={emailAddress}
            leftIcon={
              <Icon
                name="envelope"
                size={14}
                color="#8E040A"
                style={{ marginRight: "5%", marginLeft: -20 }}
              />
            }
            onChangeText={setemailAddress}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.email : null}
          />
          <Input
            containerStyle={{ marginTop: 20 }}
            label={"Password"}
            placeholder="Enter Password"
            value={password}
            leftIcon={
              <Icon
                name="lock"
                size={15}
                color="#8E040A"
                style={{ marginRight: "5%", marginLeft: -20 }}
              />
            }
            onChangeText={setPassword}
            secureTextEntry
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.password : null}
          />
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="SIGN IN"
            onPress={() => handleSignIn()}
          />
          <Text
            style={{ marginLeft: "17%", marginTop: 5 }}
            onPress={() => signUp()}
          >
            Don't have an account? Sign Up
          </Text>
        </Card>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#fff",
    letterSpacing: 3,
  },
});

export default SignInScreen;
