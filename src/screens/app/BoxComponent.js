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

export  default  BoxComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      activeOpacity={0.8}
      style={styles.column}
    >
      <Icon3 name={props.icon} size={40} color="#fff" />
      <Text style={styles.icontext}>{props.title}</Text>
    </TouchableOpacity>
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
  
