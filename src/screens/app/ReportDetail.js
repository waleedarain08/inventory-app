import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input, Card, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { validateAll } from "indicative/validator";
import { Api } from "../../utils/Api";


const ReportDetail = ({ route, navigation }) => {
  const [editForm, setEditForm] = useState(true);
  const [devName, setDevName] = useState(route.params.item.user.username);
  const [subject, setSubject] = useState("Request for headphone change.");
  const [machine, setMachine] = useState("Dell");
  const [lcd, setLcd] = useState("Sony");
  const [headPhone, setheadPhone] = useState("A4Tech");
  const [extraScreen, setextraScreen] = useState("Sony");
  const [mouse, setMouse] = useState("A4Tech");
  const [keyboard, setKeyboard] = useState("Hp");
  const [accept, setAccept] = useState(true);
  const [decline, setDecline] = useState(false);
  const [FormErrors, setFormErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: route.params.item.user.username });
    setSubject(route.params.item.detail);
  }, []);

  const handleSubmit = () => {
    const rules = {
      devName: "required|string",
    };

    const data = {
      devName: devName,
    };

    const messages = {
      required: (field) => `${field} is required`,
    };

    validateAll(data, rules, messages)
      .then(() => {
        alert("Record Updated");
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

  const toggleRequest = (val) => {
    if(val){
      setAccept(true);
      setDecline(false);
    }else{
      setAccept(false);
      setDecline(true);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {!editForm && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setEditForm(true);
            alert(
              "Edit assets info and press Update button to save information."
            );
          }}
          style={{
            position: "absolute",
            right: "11%",
            top: "3%",
            flexDirection: "row",
          }}
        >
          <Icon name="edit" size={20} color="#fff" />
          <Text style={{ color: "#fff" }}> Edit Info</Text>
        </TouchableOpacity>
      )} */}
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("../../images/qr-code.png")}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            marginTop: 20,
          }}
        />
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
          {/* <Input
            label={"Dev Name"}
            placeholder="Enter Dev Name"
            value={devName}
            containerStyle={{marginTop:10}}
            onChangeText={setDevName}
            editable={editForm}
            errorStyle={{ color: "red" }}
            errorMessage={FormErrors ? FormErrors.devName : null}
          /> */}
          <Input
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
          />
           <CheckBox
            title="Accept Request"
            checked={accept}
            checkedColor={"#8E040A"}
            containerStyle={{marginTop:10}}
            onPress={() => toggleRequest(1)}
          />
           <CheckBox
            title="Decline Request"
            checked={decline}
            checkedColor={"#8E040A"}
            containerStyle={{marginTop:10}}
            onPress={() => toggleRequest(0)}
          />
          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="Update Information/QR"
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
