import React, { useEffect, useState, useContext } from "react";
import { validateAll } from "indicative/validator";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import {
  Input,
  Card,
  FormValidationMessage,
  Button,
} from "react-native-elements";

import { AuthContext } from "../../utils/authContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Api } from "../../utils/Api";
import Spinner from "react-native-loading-spinner-overlay";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [cnic, setCnic] = useState("");
  const [joining_date, setJoiningDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [SignUpErrors, setSignUpErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const { signUp, signIn } = useContext(AuthContext);

  const handleSignUp = () => {
    const rules = {
      username: "required|string|max:20",
      email: "required|email",
      password: "required|string|min:6|max:40|confirmed",
      cnic: "required|min:13|max:13",
      joining_date: "required|string",
      mobile_no: "required|min:11|max:11",
      designation: "required|string|min:6|max:40",
    };

    const data = {
      email: emailAddress,
      password: password,
      password_confirmation: password_confirmation,
      cnic: cnic,
      mobile_no: mobile_no,
      joining_date: joining_date,
      designation: designation,
      username: username,
      qrcode: ""
    };

    const messages = {
      required: (field) => `${field} is required`,
      "email.email": "Please enter a valid email address",
      "password.min":
        "Password is too short. Must be greater than 6 characters",
      "password.confirmed": "Passsword and confrim password do not match",
      "cnic.min": "CNIC should contain 13 digits without -",
      "cnic.max": "CNIC should contain 13 digits without -",
      "mobile_no.min": "Mobile No should contain 11 digits",
      "mobile_no.max": "Mobile No should contain 11 digits",
    };

    validateAll(data, rules, messages)
      .then(() => {
        setSignUpErrors({});
        setLoading(true);
        Api.POST("auth/register", data).then((response) => {
          //console.log(response);
          setLoading(false);
          if (response.statusCode >= 400) {
            Alert.alert("Sorry!", response.errorMessage);
          } else {
            signIn(null);
            Alert.alert(
              "Congratulations",
              "Account created successfully,you can now signin"
            );
          }
        });
        // signIn();
        //signUp({ emailAddress, password });
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          console.log(err.message);
          formatError[err.field] = err.message;
        });
        setSignUpErrors(formatError);
      });
  };

  const handleConfirm = (date) => {
    setJoiningDate(date.toISOString().substr(0, 10));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    const backHandle = BackHandler.addEventListener("hardwareBackPress", () => {
      signIn();
      return true;
    });
    return () => {
      backHandle.remove();
    };
  }, [SignUpErrors]);

  return (
    <View style={{ backgroundColor: "#30313160", flex: 1 }}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
      {/* <View style={{ flex: 1}}></View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: "5%",
          justifyContent: "center",
        }}
      >
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Enter Name"}
            placeholder="Enter Your Name"
            value={username}
            onChangeText={setUsername}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.username : null}
          />
          <Input
            containerStyle={{ marginTop: 10 }}
            label={"Email"}
            placeholder="Enter Email address"
            value={emailAddress}
            autoCapitalize={"none"}
            onChangeText={setemailAddress}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.email : null}
          />
          <Input
            containerStyle={{ marginTop: 10 }}
            label={"Password"}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorMessage={SignUpErrors ? SignUpErrors.password : null}
          />
          <Input
            containerStyle={{ marginTop: 10 }}
            label={"Password Confirm"}
            placeholder="Enter password again"
            name="password_confirmation"
            value={password_confirmation}
            onChangeText={setpassword_confirmation}
            secureTextEntry
            errorMessage={
              SignUpErrors ? SignUpErrors.password_confirmation : null
            }
          />
          <Input
            label={"Mobile"}
            placeholder="03335001234"
            value={mobile_no}
            keyboardType={"number-pad"}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMobileNo}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.mobile_no : null}
          />
          <Input
            label={"CNIC"}
            placeholder="4220161850673"
            value={cnic}
            keyboardType={"number-pad"}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setCnic}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.cnic : null}
          />
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
          >
            <Input
              label={"Joining Date"}
              placeholder="01-05-2018"
              value={joining_date}
              pointerEvents="none"
              editable={false}
              containerStyle={{ marginTop: 10 }}
              errorStyle={{ color: "red" }}
              errorMessage={
                SignUpErrors
                  ? SignUpErrors.joining_date && "joining date is required"
                  : null
              }
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Input
            label={"Designation"}
            placeholder="Enter Designation"
            value={designation}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setDesignation}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.designation : null}
          />

          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="SIGN UP"
            onPress={() => handleSignUp()}
          />
          <Text style={{ marginLeft: "22%" }} onPress={() => signIn()}>
            Already Signed Up? Sign In
          </Text>
        </Card>
      </ScrollView>
      {/* <View style={{ flex: 1 }}></View> */}
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

export default SignUpScreen;
