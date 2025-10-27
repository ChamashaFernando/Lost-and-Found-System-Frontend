// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   TouchableOpacity, 
//   Image, 
//   TextInput, 
//   Button, 
//   StyleSheet, 
//   Alert 
// } from 'react-native';
// import axios from 'axios';

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
//   const user = route.params?.user;
//   const token = route.params?.token;

//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');

//   // 🔹 Fetch all items (useCallback to prevent re-creation)
//   const fetchAllItems = useCallback(async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setItems(response.data);
//     } catch (err) {
//       console.error('Fetch items error:', err);
//       Alert.alert("Error", "Failed to load items.");
//     }
//   }, [token]);

//   useEffect(() => {
//     if (!token) {
//       Alert.alert("Session expired", "Please login again.");
//       navigation.navigate('Login');
//       return;
//     }
//     fetchAllItems();
//   }, [fetchAllItems, navigation, token]); // ✅ ESLint fix

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
//         params: { category, location, emergency: false },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setItems(response.data);
//     } catch (err) {
//       console.error('Search error:', err);
//       Alert.alert("Error", "Search failed.");
//     }
//   };

//   const handleCategoryPress = (catName) => {
//     setCategory(catName);
//     handleSearch();
//   };

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <Text style={styles.title}>Lost & Found Items</Text>

//       {/* Category Horizontal List */}
//       <FlatList
//         data={categories}
//         horizontal
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.category} onPress={() => handleCategoryPress(item.name)}>
//             <Image source={item.image} style={styles.categoryImage} />
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* Search */}
//       <TextInput 
//         placeholder="Category" 
//         value={category} 
//         onChangeText={setCategory} 
//         style={styles.input} 
//       />
//       <TextInput 
//         placeholder="Location" 
//         value={location} 
//         onChangeText={setLocation} 
//         style={styles.input} 
//       />
//       <Button title="Search" onPress={handleSearch} />

//       {/* Items List */}
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ItemDetail', { item, user, token })}
//             style={styles.itemCard}
//           >
//             {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
//             <Image 
//               source={item.imageUrl ? { uri: `http://172.20.10.3:8096${item.imageUrl}` } : require('../assets/no-image.png')} 
//               style={styles.itemImage} 
//             />
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <Text>Category: {item.category}</Text>
//             <Text>Location: {item.location}</Text>
//             <Text>Status: {item.status}</Text>
//           </TouchableOpacity>
//         )}
//         style={{ marginTop: 10 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#222' },
//   category: { alignItems: 'center', marginRight: 15 },
//   categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
//   categoryText: { fontSize: 12 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 5 },
//   itemCard: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
//   itemImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 5 },
//   itemTitle: { fontSize: 18, fontWeight: 'bold' },
//   emergency: { color: 'red', fontWeight: 'bold', marginBottom: 5 },
// });




import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert 
} from 'react-native';
import axios from 'axios';

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

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const fetchAllItems = useCallback(async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    } catch (err) {
      console.error('Fetch items error:', err);
      Alert.alert("Error", "Failed to load items.");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      Alert.alert("Session expired", "Please login again.");
      navigation.navigate('Login');
      return;
    }
    fetchAllItems();
  }, [fetchAllItems, navigation, token]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
        params: { category, location, emergency: false },
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert("Error", "Search failed.");
    }
  };

  const handleCategoryPress = (catName) => {
    setCategory(catName);
    handleSearch();
  };

  const handlePostItem = () => {
    navigation.navigate('PostItem', { user, token });
  };

  const handleViewClaims = () => {
    navigation.navigate('ClaimList', { user, token });
  };

  // FlatList Header
  const renderHeader = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.title}>Lost & Found Items</Text>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category} onPress={() => handleCategoryPress(item.name)}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

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

      {/* Buttons under Search */}
      <View style={{ marginTop: 15 }}>
        <Button title="Post New Item" onPress={handlePostItem} />
        <View style={{ height: 10 }} />
        <Button title="View All Claims" onPress={handleViewClaims} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetail', { item, user, token })}
            style={styles.itemCard}
          >
            {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
            <Image 
              source={item.imageUrl ? { uri: `http://172.20.10.3:8096${item.imageUrl}` } : require('../assets/no-image.png')} 
              style={styles.itemImage} 
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#222' },
  category: { alignItems: 'center', marginRight: 15 },
  categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
  categoryText: { fontSize: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 5 },
  itemCard: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
  itemImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 5 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  emergency: { color: 'red', fontWeight: 'bold', marginBottom: 5 },
});
