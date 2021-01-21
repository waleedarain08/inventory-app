import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { validateAll } from "indicative/validator";
import { Input, Card, Button, CheckBox } from "react-native-elements";

const AssetRequest = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [devName, setDevName] = useState("Waleed J.");
  const [machine, setMachine] = useState(false);
  const [lcd, setLcd] = useState(false);
  const [headPhone, setheadPhone] = useState(false);
  const [extraScreen, setextraScreen] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [internetDevice, setInternetDevice] = useState(false);

  //useEffect(() => {}, []);

  const handleSubmit = () => {
    if(subject===""){
      alert("Please enter subject.")
    }
    else if (
      !(
        machine ||
        lcd ||
        headPhone ||
        extraScreen ||
        mouse ||
        keyboard ||
        internetDevice
      )
    ) {
      alert("Please select atleast one asset to continue.");
    } else {
      alert(
        "Request submitted sucessfully , please wait for admin approval you can check status from request list screen."
      );
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
          />
           <Input
            label={"Add Subject"}
            containerStyle={{marginTop:10}}
            placeholder="Request for a new Headphone."
            value={subject}
            onChangeText={setSubject}
            errorStyle={{ color: "red" }}
          />
          <Text style={{marginTop:10,color:"#aeaeae",marginLeft:"4%",fontWeight:"bold",fontSize:16}}>Choose Asset</Text>
          <CheckBox
            title="Machine"
            checked={machine}
            containerStyle={{marginTop:10}}
            onPress={() => setMachine(!machine)}
          />
          <CheckBox
            title="Lcd"
            checked={lcd}
            containerStyle={{marginTop:10}}
            onPress={() => setLcd(!lcd)}
          />
          <CheckBox
            title="Head Phone"
            checked={headPhone}
            onPress={() => setheadPhone(!headPhone)}
          />
          <CheckBox
            title="Keyboard"
            checked={keyboard}
            onPress={() => setKeyboard(!keyboard)}
          />
          <CheckBox
            title="Mouse"
            checked={mouse}
            onPress={() => setMouse(!mouse)}
          />
          <CheckBox
            title="Extra Screen"
            checked={extraScreen}
            onPress={() => setextraScreen(!extraScreen)}
          />
          <CheckBox
            title="Internet Device"
            checked={internetDevice}
            onPress={() => setInternetDevice(!internetDevice)}
          />
          <Input
            placeholder="Additional Comments or message"
            leftIcon={{ type: "font-awesome", name: "comment",size:14 }}
            onChangeText={(value) => setComment(value)}
            inputStyle={{marginLeft:14,fontSize:12}}
            containerStyle={{marginTop:5}}
            multiline={true}
            value={comment}
          />
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
