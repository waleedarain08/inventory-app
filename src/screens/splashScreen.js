import React, {useContext,useEffect} from 'react';
import {View, Text, StyleSheet ,ActivityIndicator} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { MyContext } from '../utils/myContext';
const SplashScreen = () => {
  //const { signIn } = useContext(AuthContext);
  const [state, dispatch] = useContext(MyContext);
  useEffect(()=>{
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        // Restoring token failed
      }

      if (user !== null) {
        dispatch({ type: "SIGN_IN", user: JSON.parse(user) });
      }else{
        dispatch({ type: "TO_SIGNIN_PAGE" });
      }
    };
    bootstrapAsync();
  },[]);
  return (
    <View style={styles.center}>
      <ActivityIndicator color="#8E040A" size="large" />
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#000"
  },
  title: {
    color:"#fff",
    fontSize: 12,
    marginTop: 10,
  },
});
export default SplashScreen;
