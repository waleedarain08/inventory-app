import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, Linking,Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native-elements";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
import { Api } from "../../utils/Api";
import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";

const ScanQR = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [state, dispatch] = useContext(MyContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const [name, setName] = useState("");
  // const [machine, setMachine] = useState("");
  // const [lcd, setLcd] = useState("");
  // const [headphone, setHeadphone] = useState("");
  // const [extrascreen, setExtrascreen] = useState("");
  // const [mouse, setMouse] = useState("");
  // const [keyboard, setKeyboard] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const isUrl = (s) => {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (isUrl(data)) {
      Linking.canOpenURL(data).then((supported) => {
        if (supported) {
          Linking.openURL(data);
        } else {
          console.log("Don't know how to open URI: " + data);
        }
      });
    } else {
      setLoading(true);
      const endPoint = "admin/users/" + data;
      Api.GET(endPoint, state.user.access_token).then((response) => {
        response.editable=false;
        //console.log(response);
        setLoading(false);
        if (response.statusCode >= 400) {
          Alert.alert("Sorry!", response.errorMessage);
          if (response.statusCode == 401) {
            signIn();
          }
        } else {
          navigation.navigate("Update Profile", { item: response  });
        }
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    return (
      <View style={styles.container}>
        <Spinner
          visible={isLoading}
          color={"#fff"}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          textContent={"Please Wait..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Text>Qr Code Scanned.</Text>
      </View>
      // <View style={styles.container}>
      //    <View style={{flex:2}}></View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Employee Name :</Text>
      //     <Text style={styles.title}>{name}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Machine :</Text>
      //     <Text style={styles.title}>{machine}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Lcd :</Text>
      //     <Text style={styles.title}>{lcd}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Headphone :</Text>
      //     <Text style={styles.title}>{headphone}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Extra Screen :</Text>
      //     <Text style={styles.title}>{extrascreen}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Mouse :</Text>
      //     <Text style={styles.title}>{mouse}</Text>
      //   </View>
      //   <View style={styles.flexRow}>
      //     <Text style={styles.title}>Keyboard :</Text>
      //     <Text style={styles.title}>{keyboard}</Text>
      //   </View>
      //   <View style={{flex:2}}></View>
      // </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#303131",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        source={require("../../images/scan.png")}
        style={{ width: "90%", height: 280, tintColor: "#30313160" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: "#000",
    letterSpacing: 2,
    fontSize: 16,
    marginLeft: "5%",
    fontWeight: "bold",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ScanQR;
