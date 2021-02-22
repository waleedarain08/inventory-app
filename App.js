// @flow

import "react-native-gesture-handler";
import React, { useEffect, useContext, useMemo, useReducer } from "react";
import { TouchableOpacity,LogBox } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Auth Screens
import SignInScreen from "./src/screens/auth/signInScreen";
import SignUpScreen from "./src/screens/auth/signUpScreen";
import SplashScreen from "./src/screens/splashScreen";
//App Screens admin
import Dashboard from "./src/screens/app/Home";
import GenerateQR from "./src/screens/app/GenerateQR";
import ScanQR from "./src/screens/app/ScanQR";
import History from "./src/screens/app/History";
import Reports from "./src/screens/app/Reports";
import ReportDetail from "./src/screens/app/ReportDetail";
//App Screens user
import AssetRequest from "./src/screens/app/AssetRequest";
import UpdateUser from "./src/screens/app/UpdateUser";
import ViewQR from "./src/screens/app/ViewQR";

import AsyncStorage from "@react-native-community/async-storage";
import { stateConditionString } from "./src/utils/helpers";
import { AuthContext } from "./src/utils/authContext";
import { MyContext } from "./src/utils/myContext";
import { reducer, initialState } from "./src/reducer";

LogBox.ignoreAllLogs(true) // Ignore log notification by message

const Stack = createStackNavigator();

const createHomeStack = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      // removing token failed
    }
    signOut();
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => removeToken()}>
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
        name="Add New Employee"
        title="Add Employee"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={SignUpScreen}
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
        name="Employees List"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={Reports}
      />
      <Stack.Screen
        name="ReportDetail"
        options={{
          title: "",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={ReportDetail}
      />
      <Stack.Screen
        name="Asset Request"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={AssetRequest}
      />
      <Stack.Screen
        name="Update Profile"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={UpdateUser}
      />
      <Stack.Screen
        name="My QR"
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#303131" },
        }}
        component={ViewQR}
      />
    </Stack.Navigator>
  );
};

export default App = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  ///console.log(state);
 
   const saveToken = async (user) => {

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      // console.log(e);
      // saving token failed
    }
  };

  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (
          data &&
          data.user !== undefined &&
          data.access_token !== undefined
        ) {
          saveToken(data);
          dispatch({ type: "SIGN_IN", user: data});
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
    //console.log(state);
    let navigateTo = stateConditionString(state);
    let arr = [];
    switch (navigateTo) {
      case "LOAD_APP":
        arr.push(<Stack.Screen  options={{
          headerShown: false,
          title: "Welcome",
          headerStyle: { backgroundColor: "#8E040A" },
        }}
         name="Splash" component={SplashScreen} />);
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
                  onPress={() => dispatch({ type: "TO_SIGNIN_PAGE" })}
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
      <MyContext.Provider value={[state,dispatch]}>
        <NavigationContainer>
          <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </AuthContext.Provider>
  );
};
