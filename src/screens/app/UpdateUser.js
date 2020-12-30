import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { validateAll } from "indicative/validator";
import { Input, Card, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const UpdateUser = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [devName, setDevName] = useState("Waleed J.");
  const [email, setEmail] = useState("waleed.j@allshorestaffing.com");
  const [password, setPassword] = useState("abcdef");
  const [cnic, setCnic] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [department, setDepartment] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [FormErrors, setFormErrors] = useState({});

  useEffect(() => {}, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setJoiningDate(date.toISOString().substr(0, 10));
    hideDatePicker();
  };

  const handleSubmit = () => {
    const rules = {
      devName: "required|string",
      email: "required|string",
      password: "required|string",
      cnic: "required|min:13|max:13",
      joiningDate: "required|string",
      department: "required|string",
    };

    const data = {
      devName: devName,
      email: email,
      password: password,
      cnic: cnic,
      joiningDate: joiningDate,
      department: department,
    };

    const messages = {
      required: (field) => `${field} is required`,
      "devName.alpha": "Employee name contains unallowed characters",
      "email.email": "Please enter a valid email address",
      "password.min":
        "Password is too short. Must be greater than 6 characters",
      "cnic.min": "CNIC should contain 13 digits without -",
      "cnic.max": "CNIC should contain 13 digits without -",
    };

    validateAll(data, rules, messages)
      .then(() => {
        setFormErrors({});
        alert("Profile Updated!");
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          formatError[err.field] = err.message;
        });
        setFormErrors(formatError);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#303131" }]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: "5%",
          justifyContent: "center",
        }}
      >
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Employee Name"}
            placeholder="Enter Employee Name"
            value={devName}
            onChangeText={setDevName}
            editable={false}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.devName : null}
          />
          <Input
            label={"Email Address"}
            placeholder="Enter Email Address"
            value={email}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setEmail}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.email : null}
          />
          <Input
            label={"Password"}
            placeholder="Enter Password"
            value={password}
            secureTextEntry
            containerStyle={{ marginTop: 10 }}
            onChangeText={setPassword}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.password : null}
          />
          <Input
            label={"CNIC"}
            placeholder="Enter CNIC"
            value={cnic}
            keyboardType={"number-pad"}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setCnic}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.cnic : null}
          />
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
          >
            <Input
              label={"Joining Date"}
              placeholder="Enter Joining Date"
              value={joiningDate}
              pointerEvents="none"
              editable={false}
              containerStyle={{ marginTop: 10 }}
              errorStyle={{ color: "red" }}
              errorMessage={
                FormErrors
                  ? FormErrors.joiningDate && "Joining Date is required"
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
            label={"Department"}
            placeholder="Enter Department"
            value={department}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setDepartment}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.department : null}
          />
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="UPDATE"
            onPress={() => handleSubmit()}
          />
        </Card>
      </ScrollView>
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

export default UpdateUser;
