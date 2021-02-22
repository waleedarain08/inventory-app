import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { validateAll } from "indicative/validator";
import { Input, Card, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";
import { Api } from "../../utils/Api";
import { ImageUrl } from "../../utils/Api";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateUser = ({ navigation, route }) => {
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState(ImageUrl);
  const [machine, setMachine] = useState("");
  const [lcd, setLcd] = useState("");
  const [headPhone, setheadPhone] = useState("");
  const [extraScreen, setextraScreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [lastRequest, setLastRequest] = useState("");
  const [FormErrors, setFormErrors] = useState({});

  useEffect(() => {
    fillForm();
  }, []);

  const openBrowser = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const fillForm = () => {
    setLoading(true);
    navigation.setOptions({ title: "Employee Assets Detail" });
    setUsername(route.params.item.username);
    setMachine(route.params.item.machine);
    setLcd(route.params.item.lcd);
    setheadPhone(route.params.item.headPhone);
    setextraScreen(route.params.item.extraScreen);
    setMouse(route.params.item.mouse);
    setKeyboard(route.params.item.keyboard);
    setUrl(ImageUrl + route.params.item.qrcode);
    Api.GET(
      `requests/lastRequest/${route.params.item.id}`,
      state.user.access_token
    ).then((response) => {
      setLoading(false);
      if (response && response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
        if (response.statusCode == 401) {
          signIn();
        }
      } else {
        typeof response.detail != "undefined"
          ? setLastRequest(response.detail)
          : setLastRequest("");
      }
    });
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
      machine: "required|string",
      lcd: "required|string",
      headPhone: "required|string",
      extraScreen: "required|string",
      mouse: "required|string",
      keyboard: "required|string",
    };

    const data = {
      username: username,
      machine: machine,
      lcd: lcd,
      headPhone: headPhone,
      extraScreen: extraScreen,
      mouse: mouse,
      keyboard: keyboard,
    };

    const messages = {
      required: (field) => `${field} is required`,
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
          //console.log(response);
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
        //console.log(formatError);
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
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          {route.params.item.qrcode == "" ||
          route.params.item.qrcode == null ||
          route.params.item.qrcode == "undefined" ? (
            <Text style={{ color: "#fff", marginTop: 10 }}>
              No Qr-Code generated yet by admin.
            </Text>
          ) : (
            <Image
              source={{
                uri: url,
              }}
              style={{ height: 120, width: 120 }}
            />
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
          <Input
            label={"Machine"}
            placeholder="Enter Machine"
            value={machine}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMachine}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.machine : null}
          />
          <Input
            label={"Lcd"}
            placeholder="Enter Lcd"
            value={lcd}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setLcd}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.lcd : null}
          />
          <Input
            label={"Headphone"}
            placeholder="Enter Headphone"
            value={headPhone}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setheadPhone}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.headPhone : null}
          />
          <Input
            label={"Extra Screen"}
            placeholder="Enter Extra Screen"
            value={extraScreen}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setextraScreen}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.extraScreen : null}
          />
          <Input
            label={"Mouse"}
            placeholder="Enter Mouse"
            value={mouse}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMouse}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.mouse : null}
          />
          <Input
            label={"Keyboard"}
            placeholder="Enter Keyboard"
            value={keyboard}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setKeyboard}
            editable={route.params.item.editable}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.keyboard : null}
          />
          <Input
            label={"Last Request"}
            placeholder="No Request Found"
            value={lastRequest}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setLastRequest}
            errorStyle={{ color: "red" }}
            editable={false}
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("History", {
                    userId: route.params.item.id,
                  })
                }
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#8E040A", marginRight: 10 }}>
                  View All
                </Text>
                <Icon name={"list"} size={20} color="#8E040A" />
              </TouchableOpacity>
            }
            errorMessage={FormErrors ? FormErrors.lastRequest : null}
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
          {route.params.item.qrcode != "" ? (
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
          ) : (
            <View></View>
          )}
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
