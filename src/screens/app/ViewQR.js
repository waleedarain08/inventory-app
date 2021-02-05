import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { MyContext } from "../../utils/myContext";
import { ImageUrl } from "../../utils/Api";

const ViewQR = () => {
  let logoFromFile = require("../../images/logo.png");
  const [state, dispatch] = useContext(MyContext);
  const [isLoading, setLoading] = useState(true);
  const [url,setUrl] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setUrl(ImageUrl+state.user.user.qrcode);
    }, 100);
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
      {state.user.user.qrcode == "" ||
      state.user.user.qrcode == null ||
      state.user.user.qrcode == "undefined" ? (
        <Text style={{fontSize:15}}>Sorry Qr-Code is not generated yet by admin</Text>
      ) : (
        <Image source={{uri:url}} style={{height:240,width:240}} />
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
