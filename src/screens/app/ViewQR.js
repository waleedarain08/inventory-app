import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Spinner from "react-native-loading-spinner-overlay";

const ViewQR = () => {
  let logoFromFile = require("../../images/logo.png");
  const [devName, setDevName] = useState("Waleed J");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
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
      {!isLoading && (
        <QRCode
          value={[{ data: devName, mode: "byte" }]}
          logo={logoFromFile}
          size={240}
          logoSize={20}
          logoBackgroundColor={"#fff"}
        />
      )}
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
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

export default ViewQR;
