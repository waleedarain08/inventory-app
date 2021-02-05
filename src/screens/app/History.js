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
import { SearchBar } from "react-native-elements";
import { Api } from "../../utils/Api";
import Spinner from "react-native-loading-spinner-overlay";
import { MyContext } from "../../utils/myContext";
import { AuthContext } from "../../utils/authContext";


export default History = ({ navigation, route }) => {
  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(
    "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  );
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    var endPoint = state.user.user.role?"requests":"requests/filter/?user="+state.user.user.user_id;

    Api.GET(endPoint, state.user.access_token).then((response) => {
      //console.log(response);
      setLoading(false);
      if (response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
        if (response.statusCode == 401) {
          signIn();
        }
      } else {
        setData(response);
      }
    });
  }, []);

  SearchFilterFunction = (text) => {
    const newData = data.filter(function (item) {
      const itemData = item.user.username ? item.user.username.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setDataSource(newData);
    setSearch(text);
  };

  const Item = ({ item, onPress, style }) => {
    var status;
    var indicator;
    if(item.status===0){
     status="Requested" 
     indicator="#b26a27"
    }else if(item.status===1){
      status="Pending" 
      indicator="#ffc805"
    }else if(item.status===2){
      status="Accepted"
      indicator="#58d622"
    }else{
      status="Declined"
      indicator="red"
    }
    return(
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View>
        {state.user.user.role ? <Text style={styles.title}>{item.user.username}</Text>:<View></View>}
        <Text style={[styles.title, { fontSize: 13 }]}>{item.item}</Text>
        <Text style={[styles.title, { fontSize: 12 }]}>{item.detail}</Text>
        <Text style={[styles.title, { fontSize: 11 }]}>{item.created_at}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:"center"}}>
        <Text style={[styles.title, { fontSize: 15, color:indicator,fontWeight:"bold" }]}>{status}</Text>
      </View>
    </TouchableOpacity>
  )};

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#8E040A" : "#303131";
    return (
      <Item
        item={item}
        onPress={() => state.user.user.role?navigation.navigate("ReportDetail",{item}):setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  if (data.length === 0 && !isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff",textAlign:"center",fontSize:16,marginTop:"5%",letterSpacing:5}}>No Record Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        color={"#fff"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
        textContent={"Please Wait..."}
        textStyle={styles.spinnerTextStyle}
      />
      {state.user.user.role ? (
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => SearchFilterFunction(text)}
          onClear={(text) => SearchFilterFunction("")}
          placeholder="Type Employee Name Here..."
          value={search}
        />
      ):(<View></View>)}
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
  spinnerTextStyle: {
    color: "#fff",
    letterSpacing: 3,
  }
});
