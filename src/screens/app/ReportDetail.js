import React, { useEffect } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";

const ReportDetail = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: route.params.item.title });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, marginBottom: "5%", justifyContent: "center" }}>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Text style={styles.logisitics}>Laptop</Text>
          <Text style={styles.logisitics}>Mouse</Text>
          <Text style={styles.logisitics}>Keyboard</Text>
          <Text style={styles.logisitics}>Extra Screen</Text>
          <Text style={styles.logisitics}>Internet Device</Text>
          <Text style={styles.logisitics}>Headphones</Text>
          <Text style={styles.logisitics}>Laptop Charger</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303131",
  },
  logisitics: {
    textAlign: "center",
    fontSize: 17,
    color: "#000",
    fontWeight: "700",
    margin:7
  },
});

export default ReportDetail;
