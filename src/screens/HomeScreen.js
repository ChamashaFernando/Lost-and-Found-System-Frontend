// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Button, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { searchItems, getItemsByUser } from '../api/items';
// import ItemCard from '../components/ItemCard';
// import { getUser } from '../utils/storage';

// const categories = [
//   { id: "1", name: "Wallets", image: require("../assets/wallet.png") },
//   { id: "2", name: "Watches", image: require("../assets/watch.png") },
//   { id: "3", name: "Caps", image: require("../assets/cap.png") },
//   { id: "4", name: "Umbrellas", image: require("../assets/umbrella.png") },
//   { id: "5", name: "Bags", image: require("../assets/bag.png") },
//   { id: "6", name: "Phones", image: require("../assets/phone.png") },
//   { id: "7", name: "Bottles", image: require("../assets/bottle.png") },
//   { id: "8", name: "Others", image: require("../assets/others.png") },
// ];

// export default function HomeScreen({ navigation, route }) {
//   const [userId, setUserId] = useState(null);
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');

//   // Fetch logged-in user from AsyncStorage
//   useEffect(() => {
//     const loadUser = async () => {
//       const user = await getUser();
//       if(user && user.id) {
//         setUserId(user.id);
//       }
//     };
//     loadUser();
//   }, []);

//   const fetchItems = async () => {
//     if(!userId) return;
//     try {
//       const data = await getItemsByUser(userId);
//       setItems(data);
//     } catch(err) {
//       console.error('Fetch items error:', err);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const results = await searchItems({ category, location, emergency: false });
//       setItems(results);
//     } catch(err) {
//       console.error('Search error:', err);
//     }
//   };

//   useEffect(() => { fetchItems(); }, [userId]);

//   const handleCategoryPress = (catName) => {
//     setCategory(catName);
//     handleSearch();
//   };

//   return (
//     <ScrollView style={{ flex:1, padding:20 }}>
//       <Text style={{ fontSize:24, marginBottom:10 }}>Lost & Found Items</Text>

//       {/* Category images */}
//       <FlatList
//         data={categories}
//         horizontal
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.category} onPress={() => handleCategoryPress(item.name)}>
//             <Image source={item.image} style={styles.categoryImage} />
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         style={{ marginBottom: 20 }}
//       />

//       {/* Search inputs */}
//       <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input}/>
//       <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input}/>
//       <Button title="Search" onPress={handleSearch} />

//       {/* User items */}
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <ItemCard item={item} onPress={() => navigation.navigate('ItemDetail', { item })} />
//         )}
//         style={{ marginVertical: 20 }}
//       />

//       <Button title="Post New Item" onPress={() => navigation.navigate('PostItem', { userId })} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   category: { alignItems:'center', marginRight:15 },
//   categoryImage: { width:60, height:60, borderRadius:30, marginBottom:5 },
//   categoryText: { fontSize:12 },
//   input: { borderWidth:1, marginBottom:5, padding:8, borderRadius:5 }
// });







import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Button, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { searchItems, getItemsByUser } from '../api/items';
import ItemCard from '../components/ItemCard';

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

export default function HomeScreen({ navigation, route }) {
  const user = route.params?.user;
  const token = route.params?.token;

  const [userId, setUserId] = useState(user?.id || null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!userId || !token) {
      Alert.alert("Session expired", "Please login again.");
      navigation.navigate('Login');
      return;
    }
    fetchItems();
  }, [userId]);

  const fetchItems = async () => {
    try {
      const data = await getItemsByUser(userId, token);
      setItems(data);
    } catch (err) {
      console.error('Fetch items error:', err);
      Alert.alert("Error", "Failed to load your items. Please try again.");
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchItems({ category, location, emergency: false }, token);
      setItems(results);
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert("Error", "Search failed. Try again.");
    }
  };

  const handleCategoryPress = (catName) => {
    setCategory(catName);
    handleSearch();
  };

  const handlePostItem = () => {
    if (!user || !token) {
      Alert.alert('Please login again', 'You must be logged in to post an item.');
      navigation.navigate('Login');
      return;
    }
    navigation.navigate('PostItem', { user, token });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Lost & Found Items</Text>

      {/* Category List */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category} onPress={() => handleCategoryPress(item.name)}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 20 }}
      />

      {/* Search Inputs */}
      <TextInput 
        placeholder="Category" 
        value={category} 
        onChangeText={setCategory} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Location" 
        value={location} 
        onChangeText={setLocation} 
        style={styles.input} 
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard 
            item={item} 
            onPress={() => navigation.navigate('ItemDetail', { item, user, token })} 
          />
        )}
        style={{ marginVertical: 20 }}
      />

      {/* Post Item Button */}
      <Button title="Post New Item" onPress={handlePostItem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#222' 
  },
  category: { 
    alignItems: 'center', 
    marginRight: 15 
  },
  categoryImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginBottom: 5 
  },
  categoryText: { 
    fontSize: 12 
  },
  input: { 
    borderWidth: 1, 
    marginBottom: 5, 
    padding: 8, 
    borderRadius: 5, 
    borderColor: '#ccc' 
  }
});
