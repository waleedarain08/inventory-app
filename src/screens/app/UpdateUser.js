import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";
import { validateAll } from "indicative/validator";
import { Input, Card, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";
import { Api } from "../../utils/Api";
import { ImageUrl } from "../../utils/Api";


const UpdateUser = ({ navigation, route }) => {
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [url,setUrl] = useState("");
  const [cnic, setCnic] = useState("");
  const [joining_date, setJoiningDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [FormErrors, setFormErrors] = useState({});

  useEffect(() => {
    fillForm();
  }, []);

  const openBrowser = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }

  const fillForm = () => {
    setUsername(route.params.item.username);
    setMobileNo(route.params.item.mobile_no);
    setCnic(route.params.item.cnic);
    setJoiningDate(route.params.item.joining_date);
    setDesignation(route.params.item.designation);
    setUrl(ImageUrl+ route.params.item.qrcode);
  };

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
      username: "required|string",
      cnic: "required|min:13|max:13",
      joining_date: "required|string",
      mobile_no: "required|min:10|max:10",
      designation: "required|string|min:6|max:40",
    };

    const data = {
      cnic: cnic,
      mobile_no: mobileNo,
      joining_date: joining_date,
      designation: designation,
      username: username,
    };

    const messages = {
      required: (field) => `${field} is required`,
      "username.alpha": "Employee name contains unallowed characters",
      "cnic.min": "CNIC should contain 13 digits without -",
      "cnic.max": "CNIC should contain 13 digits without -",
      "mobile_no.min":
        "Mobile No should contain 10 digits only without starting 0",
      "mobile_no.max":
        "Mobile No should contain 10 digits only without starting 0",
    };

    validateAll(data, rules, messages)
      .then(() => {
        setFormErrors({});
        setLoading(true);
        Api.PUT(
          `admin/update/${route.params.item.id}`,
          data,
          state.user.access_token
        ).then((response) => {
          console.log(response);
          setFormErrors({});
          setLoading(false);
          if (response.statusCode >= 400) {
            Alert.alert("Sorry!", response.errorMessage);
            if (response.statusCode == 401) {
              signIn();
            }
          } else {
            Alert.alert("Congratulations!", "Profile Updated Successfully");
            navigation.navigate("Dashboard");
          }
        });
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          formatError[err.field] = err.message;
        });
        console.log(formatError);
        setFormErrors(formatError);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#303131" }]}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: "5%",
          justifyContent: "center",
        }}
      >
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center",padding:10 }}
        >
          {route.params.item.qrcode != null ? (
            <Image
              source={{
                uri:url,
              }}
              style={{ height: 120, width: 120 }}
            />
          ) : (
            <Text style={{ color: "#fff", marginTop: 10 }}>
              No Qr-Code generated yet by admin.
            </Text>
          )}
        </View>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Employee Name"}
            placeholder="Enter Employee Name"
            value={username}
            onChangeText={setUsername}
            editable={false}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.username : null}
          />
          {/* <Input
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
          /> */}
          <Input
            label={"Mobile"}
            placeholder="03335001234"
            value={mobileNo}
            keyboardType={"number-pad"}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMobileNo}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.mobile_no : null}
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
              value={joining_date}
              pointerEvents="none"
              editable={false}
              containerStyle={{ marginTop: 10 }}
              errorStyle={{ color: "red" }}
              errorMessage={
                FormErrors
                  ? FormErrors.joining_date && "Joining Date is required"
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
            errorMessage={FormErrors ? FormErrors.designation : null}
          />
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="UPDATE RECORD"
            onPress={() => handleSubmit()}
          />
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 10,
              backgroundColor: "#303131",
              elevation: 3,
            }}
            title="PRINT QR-CODE"
            onPress={() => openBrowser()}
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
