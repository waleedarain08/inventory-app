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
    title: "Waleed J",
    created_at: "08 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dv3",
    title: "Saeed A",
    created_at: "08 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Waleed J",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d54",
    title: "Saeed A",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d00",
    title: "Waleed J",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "Saeed A",
    created_at: "10 Dec 2020",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d40",
    title: "Waleed J",
    created_at: "10 Dec 2020",
  },
];

export default Reports = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(
    "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DATA);
  }, []);

  goNext = (item) => {
    setSelectedId(item.id);
    navigation.navigate("ReportDetail", { item });
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
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
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff",textAlign:"center",fontSize:16,marginTop:"5%",letterSpacing:5}}>Loading . . .</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
