import React, { useEffect, useState, useContext } from "react";
import { validateAll } from "indicative/validator";
import { View, Text, Image, Keyboard } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Card,
  FormValidationMessage,
  Button,
} from "react-native-elements";

import { AuthContext } from "../../utils/authContext";

const SignInScreen = ({ navigation }) => {
  const [emailAddress, setemailAddress] = useState("adam@gmail.com");
  const [password, setPassword] = useState("abcdef");
  const [SignUpErrors, setSignUpErrors] = useState({});

  const { signIn, signUp } = useContext(AuthContext);

  const handleSignIn = () => {
    // https://indicative.adonisjs.com
    const rules = {
      email: "required|email",
      password: "required|string|min:6|max:40",
    };

    const data = {
      email: emailAddress,
      password: password,
    };

    const messages = {
      required: (field) => `${field} is required`,
      "username.alpha": "Username contains unallowed characters",
      "email.email": "Please enter a valid email address",
      "password.min": "Wrong Password?",
    };

    validateAll(data, rules, messages)
      .then(() => {
        console.log("successfull");
        Keyboard.dismiss();
        signIn({ emailAddress, password });
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
    <View style={{ backgroundColor: "#303131", flex: 1 }}>
      <View style={{ flex: 1, justifyContent:"center" , alignItems:"center" }}>
        <Image source={require('../../images/logo.png')} style={{ width: 100, height: 100 , resizeMode:"contain"}} />
      </View>
      <View style={{ flex: 2 }}>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Email"}
            placeholder="Enter Email"
            value={emailAddress}
            leftIcon={
                <Icon
                  name='envelope'
                  size={14}
                  color='#8E040A'
                  style={{marginRight:"5%",marginLeft:-20}}
                />}
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
                  name='lock'
                  size={15}
                  color='#8E040A'
                  style={{marginRight:"5%",marginLeft:-20}}
                />}
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
              elevation:3
            }}
            title="Sign in"
            onPress={() => handleSignIn()}
          />
          <Text style={{ marginLeft: "17%",marginTop:5 }} onPress={() => signUp()}>
            Don't have an account? Sign Up
          </Text>
        </Card>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default SignInScreen;
