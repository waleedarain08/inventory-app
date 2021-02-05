import React, { useState, useEffect, useContext} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import {SearchBar} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Api } from "../../utils/Api";
import Spinner from "react-native-loading-spinner-overlay";
import { MyContext } from "../../utils/myContext";
import { AuthContext } from "../../utils/authContext";




const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Waleed J",
    created_at: "10 Dec 2020",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Saeed A",
    created_at: "12 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Waqas S",
    created_at: "08 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dv3",
    title: "James S",
    created_at: "08 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Waqas S",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d54",
    title: "Shahood H",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d00",
    title: "Waleed J",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "Shahood H",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d40",
    title: "Khurram M",
    created_at: "10 Dec 2020",
  },
];

export default Reports = ({ navigation }) => {

  const [state, dispatch] = useContext(MyContext);
  const { signIn } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(
    "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  );
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('');
  const [dataSource,setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);

  

  useEffect(() => {
    setLoading(true);
    Api.GET("admin/users", state.user.access_token).then((response) => {
      //console.log(response);
      setLoading(false);
      if (response.statusCode >= 400) {
        Alert.alert("Sorry!", response.errorMessage);
        if (response.statusCode == 401) {
          signIn();
        }
      } else {
        setData(response);
        //setEmployee(route.params.isEmployee);
      }
    });
  }, []);

  SearchFilterFunction = (text) => {
    const newData = data.filter(function(item) {
      const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setDataSource(newData);
    setSearch(text);
  }

  goNext = (item) => {
    setSelectedId(item.id);
    navigation.navigate("Update Profile", { item });
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View>
        <Text style={styles.title}>{item.username}</Text>
        <Text style={[styles.title, { fontSize: 11 }]}>Emp Id : {item.id}</Text>
      </View>
      <Icon
        name="keyboard-arrow-right"
        style={{ alignItems: "center" }}
        size={24}
        color="#fff"
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#8E040A" : "#303131";
    return (
      <Item
        item={item}
        onPress={() => goNext(item)}
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
      <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => SearchFilterFunction(text)}
          onClear={text => SearchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
      <FlatList
        data={dataSource && dataSource.length>0 ? dataSource : data}
        key={(item) => item.id}
        renderItem={renderItem}
        extraData={data}
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
