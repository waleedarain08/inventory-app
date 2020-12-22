import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native-elements";
import { WebView } from "react-native-webview";

const ScanQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setUrl(data);
    alert(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    // return <WebView source={{ uri: url }} style={{ marginTop: 20 }} />;
    return <Text style={{ marginTop: 20 }} >{url}</Text>
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
      <Image source={require('../../images/scan.png')}  style={{width:"90%",height:280,marginLeft:"5%"}} />

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

export default ScanQR;
