import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
// import { validateAll } from "indicative/validator";
import { Input, Card, Button, CheckBox } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import RadioButtonRN from "radio-buttons-react-native";
import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";
import { Api } from "../../utils/Api";

const items = [
  {
    label: "Machine",
  },
  {
    label: "Lcd",
  },
  {
    label: "Headphone",
  },
  {
    label: "Keyboard",
  },
  {
    label: "Mouse",
  },
  {
    label: "Extra Screen",
  },
];

const AssetRequest = ({ navigation }) => {
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);
  const [devName, setDevName] = useState("");
  const [item,setItem] = useState("");
  // const [machine, setMachine] = useState(false);
  // const [lcd, setLcd] = useState(false);
  // const [headPhone, setheadPhone] = useState(false);
  // const [extraScreen, setextraScreen] = useState(false);
  // const [mouse, setMouse] = useState(false);
  // const [keyboard, setKeyboard] = useState(false);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fillForm();
  }, []);

  const fillForm = () => {
    setDevName(state.user.user.username);
  };


  const data = {
    type: "request",
    item: item,
    detail: subject,
    status: 0,
    created_at:new Date()
  };

  const handleSubmit = () => {
    if (subject === "") {
      Alert.alert("Validation Failed","Please enter subject.");
    } else if (item === "") {
     Alert.alert("Validation Failed","Please select atleast one asset to continue.");
    } else {
      setLoading(true);
      Api.POST("requests", data, state.user.access_token).then((response) => {
        //console.log(response);
        setLoading(false);
        if (response.statusCode >= 400) {
          Alert.alert("Sorry!", response.errorMessage);
          if (response.statusCode == 401) {
            signIn();
          }
        } else {
          Alert.alert(
            "Congratulations",
            "Request submitted successfully.Please wait for response"
          );
          navigation.navigate("History");
        }
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#303131" }]}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
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
            containerStyle={{ marginTop: 10 }}
            placeholder="Request for a new Headphone."
            value={subject}
            onChangeText={setSubject}
            errorStyle={{ color: "red" }}
          />
          <Text
            style={{
              marginTop: 10,
              color: "#aeaeae",
              marginLeft: "4%",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Choose Asset
          </Text>
          <RadioButtonRN animationTypes={["shake"]} activeColor={"#8E040A"} data={items} selectedBtn={(e) => setItem(e.label)} />
          {/* <CheckBox
            title="Machine"
            checked={machine}
            containerStyle={{ marginTop: 10 }}
            onPress={() => (!machine)}
          />
          <CheckBox
            title="Lcd"
            checked={lcd}
            containerStyle={{ marginTop: 10 }}
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
          /> */}
          <Input
            placeholder="Additional Comments or message"
            leftIcon={{ type: "font-awesome", name: "comment", size: 14 }}
            onChangeText={(value) => setComment(value)}
            inputStyle={{ marginLeft: 14, fontSize: 12 }}
            containerStyle={{ marginTop: 5 }}
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
