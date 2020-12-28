import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";

const Dashboard = ({ navigation }) => {
  const [isAdmin, setAdmin] = useState(false);
  if (isAdmin) {
    return (
      <View style={styles.main}>
        <View style={{ flex: 0.7 }}></View>
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
            onPress={() => navigation.navigate("History",{"isEmployee":0})}
            activeOpacity={0.8}
            style={styles.column}
          >
            <Icon3 name="history" size={40} color="#fff" />
            <Text style={styles.icontext}>Request{"\n"}Hisotry</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Reports")}
            activeOpacity={0.8}
            style={styles.column}
          >
            <Icon3 name="format-list-bulleted" size={40} color="#fff" />
            <Text style={styles.icontext}>Employees{"\n"}List</Text>
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
        {/* <View style={{ flex: 0.7 }}></View> */}
        <TouchableOpacity
          style={{ flex: 0.7 }}
          onPress={() => setAdmin(!isAdmin)}
        ></TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <View style={{ flex: 0.7 }}></View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Asset-Request")}
            activeOpacity={0.8}
            style={styles.column}
          >
            <Icon3 name="open-in-new" size={50} color="#fff" />
            <Text style={styles.icontext}>Create{"\n"}Asset Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Update Profile")}
            activeOpacity={0.8}
            style={styles.column}
          >
            <Icon3 name="update" size={50} color="#fff" />
            <Text style={styles.icontext}>Update{"\n"}Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("History",{"isEmployee":1})}
            activeOpacity={0.8}
            style={styles.column}
          >
            <Icon3 name="format-list-bulleted" size={50} color="#fff" />
            <Text style={styles.icontext}>View{"\n"}Requets List</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 0.7 }}> */}
        <TouchableOpacity
          style={{ flex: 0.7 }}
          onPress={() => setAdmin(!isAdmin)}
        ></TouchableOpacity>
        {/* </View> */}
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
