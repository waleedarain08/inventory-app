import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Card, Button, CheckBox } from "react-native-elements";
import { validateAll } from "indicative/validator";
import Spinner from "react-native-loading-spinner-overlay";
import { Api } from "../../utils/Api";
import { MyContext } from "../../utils/myContext";
import { AuthContext } from "../../utils/authContext";
import { ImageUrl } from "../../utils/Api";


const ReportDetail = ({ route, navigation }) => {
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);
  const [editForm, setEditForm] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [devName, setDevName] = useState(route.params.item.user.username);
  const [subject, setSubject] = useState("Request for headphone change.");
  const [machine, setMachine] = useState("");
  const [lcd, setLcd] = useState("");
  const [headPhone, setheadPhone] = useState("");
  const [extraScreen, setextraScreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [url,setUrl] = useState("url");
  const [accept, setAccept] = useState(true);
  const [decline, setDecline] = useState(false);
  const [FormErrors, setFormErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: route.params.item.user.username });
    setSubject(route.params.item.detail);
    setUrl(ImageUrl+route.params.item.user.qrcode);
  }, []);

  const handleSubmit = () => {
    const rules = {
      // devName: "required|string",
    };

    const data = {
      type: "request",
      item: route.params.item.item,
      detail: route.params.item.detail,
      created_at: route.params.item.created_at,
      status: accept ? 2 : 3,
    };

    const messages = {
      required: (field) => `${field} is required`,
    };
    //console.log(`requests/${route.params.item.id}`)
    validateAll(data, rules, messages)
      .then(() => {
        //console.log(data);
        setFormErrors({});
        setLoading(true);
        Api.PUT(
          `requests/${route.params.item.id}`,
          data,
          state.user.access_token
        ).then((response) => {
          console.log(response);
          setLoading(false);
          if (response.statusCode >= 400) {
            Alert.alert("Sorry!", response.errorMessage);
            if (response.statusCode == 401) {
              signIn();
            }
          } else {
            Alert.alert("Thankyou!", "Request status updated successfully.");
            navigation.navigate("Dashboard");
          }
        });
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          formatError[err.field] = err.message;
        });
        setFormErrors(formatError);
      });
  };

  const toggleRequest = (val) => {
    if (val) {
      setAccept(true);
      setDecline(false);
    } else {
      setAccept(false);
      setDecline(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        {route.params.item.user.qrcode != "" ? (
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
      <View style={{ flex: 1, marginBottom: "5%", justifyContent: "center" }}>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Last Request Subject"}
            placeholder="Enter Subject"
            value={subject}
            onChangeText={setSubject}
            editable={false}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.subject : null}
          />
          <CheckBox
            title="Accept Request"
            checked={accept}
            checkedColor={"#8E040A"}
            containerStyle={{ marginTop: 10 }}
            onPress={() => toggleRequest(1)}
          />
          <CheckBox
            title="Decline Request"
            checked={decline}
            checkedColor={"#8E040A"}
            containerStyle={{ marginTop: 10 }}
            onPress={() => toggleRequest(0)}
          />
          {/* <Input
            label={"Machine"}
            placeholder="Enter Machine"
            value={machine}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMachine}
            editable={editForm}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.machine : null}
          />
          <Input
            label={"Lcd"}
            placeholder="Enter Lcd"
            value={lcd}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setLcd}
            editable={editForm}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.lcd : null}
          />
          <Input
            label={"Headphone"}
            placeholder="Enter Headphone"
            value={headPhone}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setheadPhone}
            editable={editForm}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.headPhone : null}
          />
          <Input
            label={"Extra Screen"}
            placeholder="Enter Extra Screen"
            value={extraScreen}
            editable={editForm}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setextraScreen}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.extraScreen : null}
          />
          <Input
            label={"Mouse"}
            placeholder="Enter Mouse"
            value={mouse}
            editable={editForm}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setMouse}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.mouse : null}
          />
          <Input
            label={"Keyboard"}
            placeholder="Enter Keyboard"
            value={keyboard}
            editable={editForm}
            containerStyle={{ marginTop: 10 }}
            onChangeText={setKeyboard}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.keyboard : null}
          /> */}
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="Save"
            onPress={() => handleSubmit()}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexGrow: 1,
    backgroundColor: "#303131",
  },
  logisitics: {
    textAlign: "center",
    fontSize: 17,
    color: "#000",
    fontWeight: "700",
    margin: 7,
  },
});

export default ReportDetail;
