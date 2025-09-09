// import React from 'react';
// import { View, Text, FlatList, Button } from 'react-native';
// import ItemCard from '../components/ItemCard';

// const sampleItems = [
//   { id: 1, name: 'Wallet', location: 'Library' },
//   { id: 2, name: 'Umbrella', location: 'Cafeteria' },
// ];

// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex:1, padding:20 }}>
//       <Text style={{ fontSize:24, marginBottom:20 }}>Lost & Found Items</Text>
//       <FlatList
//         data={sampleItems}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <ItemCard item={item} onPress={() => navigation.navigate('ItemDetail', { item })} />
//         )}
//       />
//       <Button title="Post New Item" onPress={() => navigation.navigate('PostItem')} />
//     </View>
//   );
// }


// *********


import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const categories = [
  { id: "1", name: "Wallets", image: require("../assets/wallet.png") },
  { id: "2", name: "Watches", image: require("../assets/watch.png") },
  { id: "3", name: "Caps", image: require("../assets/cap.png") },
  { id: "4", name: "Umbrellas", image: require("../assets/umbrella.png") },
  { id: "5", name: "Bags", image: require("../assets/bag.png") },
  { id: "6", name: "Phones", image: require("../assets/phone.png") },
  { id: "7", name: "Bottles", image: require("../assets/bottle.png") },
  { id: "8", name: "Others", image: require("../assets/others.png") },
  

];

const items = [
  {
    id: "101",
    name: "Brown Boots",
    image: require("../assets/boots.png"),
    location: "University Library",
    date: "2025-09-01",
  },
  {
    id: "102",
    name: "Black Wallet",
    image: require("../assets/wallet.png"),
    location: "Cafeteria",
    date: "2025-09-03",
  },
];

export default function HomeScreen() {
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemLocation}>📍 {item.location}</Text>
        <Text style={styles.itemDate}>🗓 {item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Items Section */}
      <Text style={styles.sectionTitle}>Lost & Found Items</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // FlatList inside ScrollView fix
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  itemInfo: {
    marginLeft: 15,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemLocation: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  itemDate: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
});
