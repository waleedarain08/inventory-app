// @flow

import "react-native-gesture-handler";
import React, { useEffect, useContext, useMemo, useReducer } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Auth Screens
import SignInScreen from "./src/screens/auth/signInScreen";
import SignUpScreen from "./src/screens/auth/signUpScreen";
import SplashScreen from "./src/screens/splashScreen";
//App Screens
import Dashboard from "./src/screens/app/Home";
import GenerateQR from "./src/screens/app/GenerateQR";
import ScanQR from "./src/screens/app/ScanQR";
import History from "./src/screens/app/History";
import Reports from "./src/screens/app/Reports";
import ReportDetail from "./src/screens/app/ReportDetail";


import AsyncStorage from "@react-native-community/async-storage";
import { stateConditionString } from "./src/utils/helpers";
import { AuthContext } from "./src/utils/authContext";
import { reducer, initialState } from "./src/reducer";

const Stack = createStackNavigator();

const createHomeStack = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => signOut()}>
              <Icon
                name="logout-variant"
                style={{ marginRight: 15 }}
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
        component={Dashboard}
        // initialParams={{singOut: signOut}}
      />
      <Stack.Screen
        name="Generate-qr-code"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={GenerateQR}
      />
      <Stack.Screen
        name="Scan-qr-code"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={ScanQR}
      />
      <Stack.Screen
        name="History"
        title="Requests History"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={History}
      />
      <Stack.Screen
        name="Reports"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={Reports}
      />
      <Stack.Screen
        name="ReportDetail"
        options={{
          title:"",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={ReportDetail}
      />
    </Stack.Navigator>
  );
};

export default App = ({ navigation }) => {
  const { signIn } = useContext(AuthContext); // should be signUp
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({ type: "SIGN_IN", token: "Token-For-Now" });
        } else {
          dispatch({ type: "TO_SIGNIN_PAGE" });
        }
      },
      signOut: async (data) => {
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({ type: "SIGNED_UP", token: "dummy-auth-token" });
        } else {
          dispatch({ type: "TO_SIGNUP_PAGE" });
        }
      },
    }),
    []
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case "LOAD_APP":
        arr.push(<Stack.Screen name="Splash" component={SplashScreen} />);
        break;

      case "LOAD_SIGNUP":
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#303131" },
              title: "Sign Up",
              animationTypeForReplace: state.isSignout ? "pop" : "push",
              headerLeft: () => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    dispatch({ type: "TO_SIGNIN_PAGE" })
                  }
                >
                  <Icon
                    name="keyboard-backspace"
                    style={{ marginLeft: 15 }}
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
              ),
            }}
          />
        );
        break;
      case "LOAD_SIGNIN":
        arr.push(
          <Stack.Screen
            name="SignIn"
            options={{
              headerShown: false,
              title: "Welcome",
              headerStyle: { backgroundColor: "#8E040A" },
            }}
            component={SignInScreen}
          />
        );
        break;

      case "LOAD_HOME":
        arr.push(
          <Stack.Screen
            name="Home"
            component={createHomeStack}
            options={{
              headerShown: false,
            }}
          />
        );
        break;
      default:
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;
    }
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
