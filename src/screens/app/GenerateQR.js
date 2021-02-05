import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { validateAll } from "indicative/validator";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { Input, Card, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";
import { Api } from "../../utils/Api";

const GenerateQR = ({ navigation }) => {
  let logoFromFile = require("../../images/logo.png");
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [showQR, setQR] = useState(false);
  const [qrSvg, setSvg] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [devName, setDevname] = useState("");
  const [machine, setMachine] = useState("");
  const [lcd, setLcd] = useState("");
  const [headPhone, setheadPhone] = useState("");
  const [extraScreen, setextraScreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [FormErrors, setFormErrors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    Api.GET("admin/users", state.user.access_token).then((response) => {
      setLoading(false);
      if (response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
        if (response.statusCode == 401) {
          signIn();
        }
      } else {
        setUsers(response);
      }
    });
  }, []);

  const handleSubmit = () => {
    const rules = {
      employeeId: "required|string",
      machine: "required|string",
      lcd: "required|string",
      headPhone: "required|string",
      extraScreen: "required|string",
      mouse: "required|string",
      keyboard: "required|string",
    };

    const data = {
      employeeId: employeeId,
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

  const setItem = (id) => {
    setEmployeeId(id);
    setDevname(users.find((user) => user.id === id).username);
  };

  const uploadToServer = () => {
    const payload = {
      "username":employeeId,
      "file":qrSvg
    }
    setLoading(true);
    Api.POST("admin/upload", payload, state.user.access_token).then((response) => {
     // console.log(response);
      setLoading(false);
      if (response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
        if (response.statusCode == 401) {
          signIn();
        }
      } else {
        Alert.alert(
          "Congratulations",
          "Qr Code uploaded successfully at server."
        );
        navigation.navigate("Dashboard");
      }
    });
  }

  // const saveToGallery = async () => {
  //   setLoading(true);
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status === "granted") {
  //     const fileUri = FileSystem.documentDirectory + devName + ".png";
  //     const options = { encoding: FileSystem.EncodingType.Base64 };
  //     await FileSystem.writeAsStringAsync(fileUri, qrSvg, options);
  //     const asset = await MediaLibrary.createAssetAsync(fileUri)
  //     await MediaLibrary.createAlbumAsync("Zepcom-Inventory", asset, false)
  //       .then((res) => {
  //         //console.log(asset);
  //         var photo = {
  //           name: asset.filename,
  //           type: "image/png",
  //           uri: "file:///storage/emulated/0/Zepcom-Inventory/"+asset.filename,
  //         };
  //         var body = new FormData();
  //         body.append("file",photo);
  //         body.append("username", employeeId);
  //         Api.UploadFile(
  //           "admin/upload",
  //           body,
  //           state.user.access_token
  //         ).then((response) => {
  //           console.log(response);
  //           setLoading(false);
  //           if (response.statusCode >= 400) {
  //             Alert.alert("Sorry!", response.errorMessage);
  //             if (response.statusCode == 401) {
  //               signIn();
  //             }
  //           } else {
  //             Alert.alert(
  //              "Success", "File saved successfully in documents folder"
  //             );
  //             navigation.navigate("Dashboard");
  //           }
  //         });
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         alert(error);
  //       });
  //   } else {
  //     alert("Permission not granted");
  //   }
  // };

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
            { data: lcd + "|", mode: "byte" },
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
        <Spinner
          visible={isLoading}
          color={"#fff"}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          textContent={"Please Wait..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Button
          buttonStyle={{
            margin: 10,
            marginTop: 25,
            backgroundColor: "#8E040A",
            elevation: 3,
          }}
          title="UPLOAD TO SERVER"
          onPress={() => uploadToServer()}
        />
      </View>
    );
  } else {
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
          <Card containerStyle={{ borderRadius: 8 }}>
            <Picker
              selectedValue={employeeId}
              style={{ height: 45 }}
              onValueChange={(itemValue) => setItem(itemValue)}
            >
              {users.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.username}
                    value={item.id}
                  />
                );
              })}
            </Picker>
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
              label={"Lcd"}
              placeholder="Enter Lcd"
              value={lcd}
              containerStyle={{ marginTop: 10 }}
              onChangeText={setLcd}
              errorStyle={{ color: "red" }}
              errorMessage={FormErrors ? FormErrors.lcd : null}
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
  spinnerTextStyle: {
    color: "#fff",
    letterSpacing: 3,
  },
});

export default GenerateQR;
