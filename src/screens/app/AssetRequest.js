import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { validateAll } from "indicative/validator";
import { Input, Card, Button, CheckBox } from "react-native-elements";

const AssetRequest = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [devName, setDevName] = useState("Waleed J.");
  const [machine, setMachine] = useState(false);
  const [headPhone, setheadPhone] = useState(false);
  const [extraScreen, setextraScreen] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [internetDevice, setInternetDevice] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    if(!(machine || headPhone || extraScreen || mouse ||  keyboard || internetDevice)){
      alert("Please select atleast one asset to continue.");
    }else{
      alert("Request submitted sucessfully , please wait for admin approval you can check status from request list screen.");
      navigation.navigate("Dashboard");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#303131" }]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: "5%",
          justifyContent: "center",
        }}
      >
        <Card containerStyle={{ borderRadius: 8 }}>
          <Input
            label={"Employee Name"}
            placeholder="Enter Dev Name"
            value={devName}
            editable={false}
            onChangeText={setDevName}
            errorStyle={{ color: "red" }}
          />
          <CheckBox title="Machine" checked={machine}   onPress={() => setMachine(!machine)} />
          <CheckBox title="Head Phone" checked={headPhone} onPress={() => setheadPhone(!headPhone)} />
          <CheckBox title="Keyboard" checked={keyboard} onPress={() => setKeyboard(!keyboard)} />
          <CheckBox title="Mouse" checked={mouse} onPress={() => setMouse(!mouse)} />
          <CheckBox title="Extra Screen" checked={extraScreen} onPress={() => setextraScreen(!extraScreen)} />
          <CheckBox title="Internet Device" checked={internetDevice} onPress={() => setInternetDevice(!internetDevice)} />

          <Button
            buttonStyle={{
              margin: 10,
              marginTop: 25,
              backgroundColor: "#8E040A",
              elevation: 3,
            }}
            title="SUBMIT REQUEST"
            onPress={() => handleSubmit()}
          />
        </Card>
      </ScrollView>
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

export default AssetRequest;
