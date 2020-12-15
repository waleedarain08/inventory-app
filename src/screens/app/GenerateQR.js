import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { validateAll } from "indicative/validator";
import QRCode from "react-native-qrcode-svg";
import {
  Input,
  Card,
  FormValidationMessage,
  Button,
} from "react-native-elements";

const GenerateQR = () => {
  let logoFromFile = require("../../images/logo.png");
  const [showQR, setQR] = useState(false);
  const [devName, setDevName] = useState("");
  const [machine, setMachine] = useState("");
  const [headPhone, setheadPhone] = useState("");
  const [extraScreen, setextraScreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [FormErrors, setFormErrors] = useState({});
  const [qrData,setQrData]  = useState([]);

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

    //setQrData(qrData=>qrData.concat({'devName':devName}));

    validateAll(data, rules, messages)
      .then(() => {
        setQR(true);
      })
      .catch((err) => {
        const formatError = {};
        err.forEach((err) => {
          formatError[err.field] = err.message;
        });
        setFormErrors(formatError);
      });
  };
  if (showQR) {
    //console.warn(qrData);
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <QRCode
          value={[
            { data: devName+"|", mode: 'byte' },
            { data: machine+"|", mode: 'byte' },
            { data: headPhone+"|", mode: 'byte' }
        ]}
          logo={logoFromFile}
          size={240}
          logoSize={20}
          logoBackgroundColor={"#fff"}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: "5%",
            justifyContent: "center",
          }}
        >
          <Card containerStyle={{ borderRadius: 8 }}>
            <Input
              label={"Dev Name"}
              placeholder="Enter Dev Name"
              value={devName}
              onChangeText={setDevName}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.devName : null}
            />
            <Input
              label={"Machine"}
              placeholder="Enter Machine"
              value={machine}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setMachine}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.machine : null}
            />
            <Input
              label={"Headphone"}
              placeholder="Enter Headphone"
              value={headPhone}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setheadPhone}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.headPhone : null}
            />
            <Input
              label={"Extra Screen"}
              placeholder="Enter Extra Screen"
              value={extraScreen}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setextraScreen}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.extraScreen : null}
            />
            <Input
              label={"Mouse"}
              placeholder="Enter Mouse"
              value={mouse}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setMouse}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.mouse : null}
            />
            <Input
              label={"Keyboard"}
              placeholder="Enter Keyboard"
              value={keyboard}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setKeyboard}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.keyboard : null}
            />
            <Button
              buttonStyle={{
                margin: 10,
                marginTop: 25,
                backgroundColor: "#8E040A",
                elevation: 3,
              }}
              title="GENERATE QR"
              onPress={() => handleSubmit()}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default GenerateQR;
