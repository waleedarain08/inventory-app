import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MyContext } from "../../utils/myContext";
import BoxComponent from "./BoxComponent";

const Dashboard = ({ navigation }) => {
  const [state, dispatch] = useContext(MyContext);

  if (state.user.user.role) {
    return (
      <View style={styles.main}>
        <View style={{ flex: 0.3 }}></View>
        <View style={styles.row}>
          <BoxComponent
            onPress={() => navigation.navigate("Add New Employee")}
            icon={"open-in-new"}
            title={"Add \n New Employee"}
          />
        </View>
        <View style={styles.row}>
          <BoxComponent
            onPress={() => navigation.navigate("Generate-qr-code")}
            icon={"qrcode"}
            title={"Generate\nQR Code"}
          />
          <BoxComponent
            onPress={() => navigation.navigate("Employees List")}
            icon={"format-list-bulleted"}
            title={"Employees\nList"}
          />
        </View>
        <View style={styles.row}>
          <BoxComponent
            onPress={() => navigation.navigate("Scan-qr-code")}
            icon={"qrcode-scan"}
            title={"Scan\nQR Code"}
          />
          <BoxComponent
            onPress={() => navigation.navigate("History", { isEmployee: 0 })}
            icon={"history"}
            title={"All Requests\nHistory"}
          />
        </View>
        <View style={{ flex: 0.3 }}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <View style={{ flex: 0.7 }}></View>
        <View style={styles.row}>
          <BoxComponent
            onPress={() => navigation.navigate("Asset Request")}
            icon={"open-in-new"}
            title={"Create\nAsset Request"}
          />
          <BoxComponent
            onPress={() => navigation.navigate("History", { isEmployee: 1 })}
            icon={"format-list-bulleted"}
            title={"Requests\nHistory"}
          />
        </View>
        <View style={styles.row}>
          {/* <BoxComponent
            onPress={() => navigation.navigate("Scan-qr-code")}
            icon={"qrcode-scan"}
            title={"Scan \n QR Code"}
          /> */}
          <BoxComponent
            onPress={() => navigation.navigate("My QR")}
            icon={"qrcode"}
            title={"View \n My Qr Code"}
          />
        </View>
        <View style={{ flex: 0.7 }}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#303131",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Dashboard;
