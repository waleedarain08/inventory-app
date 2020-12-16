import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { validateAll } from "indicative/validator";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { Input, Card, Button } from "react-native-elements";
const GenerateQR = ({navigation}) => {
  let logoFromFile = require("../../images/logo.png");
  const [isLoading, setLoading] = useState(false);
  const [showQR, setQR] = useState(false);
  const [qrSvg, setSvg] = useState("");
  const [devName, setDevName] = useState("");
  const [machine, setMachine] = useState("");
  const [headPhone, setheadPhone] = useState("");
  const [extraScreen, setextraScreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [FormErrors, setFormErrors] = useState({});
  const [qrData, setQrData] = useState([]);

  useEffect(() => {}, []);

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

  const callback = (dataURL) => {
    setSvg(dataURL);
  };

  const getDataURL = (c) => {
    c != null && c.toDataURL(callback);
  };

  const saveToGallery = async () => {
    setLoading(true);
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const fileUri = FileSystem.documentDirectory + devName + ".png";
      const options = { encoding: FileSystem.EncodingType.Base64 };
      await FileSystem.writeAsStringAsync(fileUri, qrSvg, options);
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Zepcom-Inventory", asset, false)
        .then((response) => {
          setLoading(false);
          alert(
            "File saved successfully in documents folder name " + response.title
          );
          navigation.navigate("Dashboard");
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    } else {
      alert("Permission not granted");
    }
  };

  if (showQR) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          },
        ]}
      >
        <QRCode
          value={[
            { data: devName + "|", mode: "byte" },
            { data: machine + "|", mode: "byte" },
            { data: headPhone + "|", mode: "byte" },
            { data: extraScreen + "|", mode: "byte" },
            { data: mouse + "|", mode: "byte" },
            { data: keyboard, mode: "byte" },
          ]}
          logo={logoFromFile}
          size={240}
          logoSize={20}
          getRef={(c) => {
            getDataURL(c);
          }}
          logoBackgroundColor={"#fff"}
        />
        <ActivityIndicator
          size="large"
          color="#8E040A"
          animating={isLoading}
          style={{ margin: 10, marginTop: 25 }}
        />
        <Button
          buttonStyle={{
            margin: 10,
            marginTop: 25,
            backgroundColor: "#8E040A",
            elevation: 3,
          }}
          title="SAVE TO GALLERY"
          onPress={() => saveToGallery()}
        />
      </View>
    );
  } else {
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
  },
});

export default GenerateQR;
