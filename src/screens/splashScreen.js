import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-community/async-storage";
import { MyContext } from "../utils/myContext";
const SplashScreen = () => {
  const [state, dispatch] = useContext(MyContext);
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        // Restoring token failed
      }

      if (user !== null) {
        setTimeout(() => {
          dispatch({ type: "SIGN_IN", user: JSON.parse(user) });
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch({ type: "TO_SIGNIN_PAGE" });
        }, 1000);
      }
    };
    bootstrapAsync();
  }, []);
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="#30313140"
      source={require("../utils/loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    marginTop: 10,
  },
  lottie: {
    width: 250,
    height: 250,
  },
});
export default SplashScreen;
