import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
//import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SearchBar } from "react-native-elements";
import { Api } from "../../utils/Api";
import Spinner from "react-native-loading-spinner-overlay";
//import { reducer, initialState } from "../../reducer.js";
//import { AuthContext } from "../../utils/authContext";
import { MyContext } from "../../utils/myContext";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Ahmed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Pending",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Fahad K",
    created_at: "12 Dec 2020",
    request: "Request for change of Charger",
    status: "Rejected",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Waleed J",
    created_at: "08 Dec 2020",
    request: "Request for change of Internet device",
    status: "Rejected",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dv3",
    title: "Saeed A",
    created_at: "08 Dec 2020",
    request: "Request for change of usb device",
    status: "Approved",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Waqas A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Approved",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d54",
    title: "Saeed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Approved",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d00",
    title: "Waleed J",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Pending",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "Ahmed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Pending",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d40",
    title: "Rizwan K",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
    status: "Pending",
  },
];

export default History = ({ navigaton, route }) => {
  const [state, dispatch] = useContext(MyContext);
  const [selectedId, setSelectedId] = useState(
    "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  );
  const [isEmployee, setEmployee] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(state.userToken);
    setLoading(true);
    Api.GET("requests", state.userToken).then((response) => {
      console.log(response);
      setLoading(false);
      if (response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
      } else {
        setData(response);
        setEmployee(route.params.isEmployee);
      }
    });
  }, []);

  SearchFilterFunction = (text) => {
    const newData = data.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setDataSource(newData);
    setSearch(text);
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View>
        {!isEmployee && <Text style={styles.title}>{item.__user__.username}</Text>}
        <Text style={[styles.title, { fontSize: 12 }]}>{item.item}</Text>
        <Text style={[styles.title, { fontSize: 12 }]}>{item.detail}</Text>
        {/* <Text style={[styles.title, { fontSize: 11 }]}>{item.created_at}</Text> */}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.title, { fontSize: 12 }]}>{item.is_resolved}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#8E040A" : "#303131";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };
  if (data.length === 0) {
    return (
      // <View style={styles.container}>
      //   <Text
      //     style={{
      //       color: "#fff",
      //       textAlign: "center",
      //       fontSize: 16,
      //       marginTop: "5%",
      //       letterSpacing: 5,
      //     }}
      //   >
      //     Loading . . .
      //   </Text>
      // </View>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
    );
  }
  return (
    <View style={styles.container}>
      {!isEmployee && (
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => SearchFilterFunction(text)}
          onClear={(text) => SearchFilterFunction("")}
          placeholder="Type Employee Name Here..."
          value={search}
        />
      )}
      <FlatList
        data={dataSource && dataSource.length > 0 ? dataSource : data}
        key={(item) => item.id}
        renderItem={renderItem}
        extraData={selectedId}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303131",
  },
  item: {
    backgroundColor: "#303131",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#303131",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "800",
  },
});
