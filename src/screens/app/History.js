import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Ahmed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Fahad K",
    created_at: "12 Dec 2020",
    request: "Request for change of Charger",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Waleed J",
    created_at: "08 Dec 2020",
    request: "Request for change of Internet device",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dv3",
    title: "Saeed A",
    created_at: "08 Dec 2020",
    request: "Request for change of usb device",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Waqas A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d54",
    title: "Saeed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d00",
    title: "Waleed J",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "Ahmed A",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d40",
    title: "Rizwan K",
    created_at: "10 Dec 2020",
    request: "Request for change of Headphone",
  },
];

export default History = () => {
  const [selectedId, setSelectedId] = useState(
    "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  );
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setData(DATA);
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
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.title, { fontSize: 12 }]}>{item.request}</Text>
        <Text style={[styles.title, { fontSize: 11 }]}>{item.created_at}</Text>
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
      <View style={styles.container}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            marginTop: "5%",
            letterSpacing: 5,
          }}
        >
          Loading . . .
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => SearchFilterFunction(text)}
        onClear={(text) => SearchFilterFunction("")}
        placeholder="Type Employee Name Here..."
        value={search}
      />
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
