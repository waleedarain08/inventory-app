import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native-elements";
import { WebView } from "react-native-webview";

const ScanQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [name, setName] = useState("");
  const [machine, setMachine] = useState("");
  const [lcd, setLcd] = useState("");
  const [headphone, setHeadphone] = useState("");
  const [extrascreen, setExtrascreen] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const scanned = data.split("|");
    setScanned(true);
    setName(scanned[0]);
    setMachine(scanned[1]);
    setLcd(scanned[2]);
    setHeadphone(scanned[3]);
    setExtrascreen(scanned[4]);
    setKeyboard(scanned[5]);
    setMouse(scanned[6]);
    //alert(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    // return <WebView source={{ uri: url }} style={{ marginTop: 20 }} />;
    return (
      <View style={styles.container}>
        <View style={{flex:2}}></View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Employee Name :</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Machine :</Text>
          <Text style={styles.title}>{machine}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Lcd :</Text>
          <Text style={styles.title}>{lcd}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Headphone :</Text>
          <Text style={styles.title}>{headphone}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Extra Screen :</Text>
          <Text style={styles.title}>{extrascreen}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Mouse :</Text>
          <Text style={styles.title}>{mouse}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.title}>Keyboard :</Text>
          <Text style={styles.title}>{keyboard}</Text>
        </View>
        <View style={{flex:2}}></View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#303131",
        justifyContent: "center",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        source={require("../../images/scan.png")}
        style={{ width: "90%", height: 280, marginLeft: "5%" }}
      />

      {/* {scanned && <Button 
       buttonStyle={{
         borderRadius:8,
        width:"60%",
        marginLeft:"20%",
        marginRight:"20%",
        height:40,
        backgroundColor: "#8E040A",
        elevation:3
      }}
      title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
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
    flex:1,
    color: "#000",
    letterSpacing: 2,
    fontSize: 16,
    marginLeft: "5%",
    fontWeight: "bold",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems:"center",
  },
});
export default ScanQR;
