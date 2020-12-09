import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <View style={{ flex: 0.7 }}></View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Create-request")}
          activeOpacity={0.8}
          style={styles.column}
        >
          <Icon name="note-add" size={40} color="#fff" />
          <Text style={styles.icontext}>Create{"\n"}Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("History")}
          activeOpacity={0.8}
          style={styles.column}
        >
          <Icon3 name="history" size={40} color="#fff" />
          <Text style={styles.icontext}>See{"\n"}Hisotry</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Scan-qr-code")}
          activeOpacity={0.8}
          style={styles.column}
        >
          <Icon3 name="qrcode-scan" size={40} color="#fff" />
          <Text style={styles.icontext}>Scan{"\n"}QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Generate-qr-code")}
          activeOpacity={0.8}
          style={styles.column}
        >
          <Icon3 name="qrcode" size={40} color="#fff" />
          <Text style={styles.icontext}>Generate{"\n"}QR Code</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.7 }}></View>
    </View>
  );
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
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#8E040A",
    borderRadius: 8,
    elevation: 4,
    margin: 10,
  },
  icontext: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default Dashboard;
