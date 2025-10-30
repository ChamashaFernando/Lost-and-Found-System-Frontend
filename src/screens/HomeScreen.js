







// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert 
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';

// const categories = [
//   { id: "1", name: "Wallet", image: require("../assets/wallet.png") },
//   { id: "2", name: "Watch", image: require("../assets/watch.png") },
//   { id: "3", name: "Cap", image: require("../assets/cap.png") },
//   { id: "4", name: "Umbrella", image: require("../assets/umbrella.png") },
//   { id: "5", name: "Bag", image: require("../assets/bag.png") },
//   { id: "6", name: "Phone", image: require("../assets/phone.png") },
//   { id: "7", name: "Bottle", image: require("../assets/bottle.png") },
//   { id: "8", name: "Other", image: require("../assets/others.png") },
// ];

// export default function HomeScreen({ navigation, route }) {
//   const user = route.params?.user;
//   const token = route.params?.token;

//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');

//   const fetchAllItems = useCallback(async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Sort emergency items first
//       const sortedItems = response.data.sort((a, b) => {
//         if (a.emergency && !b.emergency) return -1;
//         if (!a.emergency && b.emergency) return 1;
//         return 0;
//       });

//       setItems(sortedItems);
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
//   }, [fetchAllItems, navigation, token]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
//         params: { category, location, emergency: false },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const sortedSearchResults = response.data.sort((a, b) => {
//         if (a.emergency && !b.emergency) return -1;
//         if (!a.emergency && b.emergency) return 1;
//         return 0;
//       });

//       setItems(sortedSearchResults);
//     } catch (err) {
//       console.error('Search error:', err);
//       Alert.alert("Error", "Search failed.");
//     }
//   };

//   const handleCategoryPress = (catName) => {
//     setCategory(catName);
//     handleSearch();
//   };

//   const handlePostItem = () => {
//     navigation.navigate('PostItem', { user, token });
//   };

//   const handleMyReports = () => {
//     navigation.navigate('MyReports', { userId: user.id, token });
//   };

//   const handleReportFound = () => {
//     navigation.navigate('ReportFound', { userId: user.id, token });
//   };

//   const renderHeader = () => (
//     <View style={{ marginBottom: 20 }}>
//       <Text style={styles.title}>Lost & Found Items</Text>

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

//       <View style={styles.searchContainer}>
//         <TextInput 
//           placeholder="Category" 
//           value={category} 
//           onChangeText={setCategory} 
//           style={styles.input} 
//         />
//         <TextInput 
//           placeholder="Location" 
//           value={location} 
//           onChangeText={setLocation} 
//           style={styles.input} 
//         />
//         <TouchableOpacity onPress={handleSearch}>
//           <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
//             <Text style={styles.buttonText}>Search</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>

//       <View style={{ marginTop: 15 }}>
//         <TouchableOpacity onPress={handlePostItem} style={{ marginBottom: 10 }}>
//           <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
//             <Text style={styles.buttonText}>Post New Item</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleMyReports} style={{ marginBottom: 10 }}>
//           <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
//             <Text style={styles.buttonText}>My Reports</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleReportFound}>
//           <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
//             <Text style={styles.buttonText}>Report Found</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, padding: 10, backgroundColor: '#f5f9ff' }}>
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ItemDetail', { item, user, token })}
//             style={[styles.itemCard, item.emergency && styles.emergencyCard]}
//           >
//             {item.emergency && <Text style={styles.emergencyLabel}>⚠️ Emergency </Text>}
//             <View style={styles.itemRow}>
//               <Image 
//                 source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
//                 style={styles.itemImage} 
//               />
//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemTitle}>{item.title}</Text>
//                 <Text style={styles.itemText}>Category: {item.category}</Text>
//                 <Text style={styles.itemText}>Location: {item.location}</Text>
//                 <Text style={styles.itemText}>Status: {item.status}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//         ListHeaderComponent={renderHeader}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#1b3358' },
//   category: { alignItems: 'center', marginRight: 15 },
//   categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
//   categoryText: { fontSize: 12, fontWeight: '600' },
//   searchContainer: { marginVertical: 10 },
//   input: { 
//     borderWidth: 1, 
//     borderColor: '#dae8f9', 
//     borderRadius: 8, 
//     padding: 10, 
//     marginBottom: 8,
//     backgroundColor: '#fff'
//   },
//   gradientButton: { 
//     padding: 12,
//     borderRadius: 10, 
//     alignItems: 'center', 
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3
//   },
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
//   itemCard: { 
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: 10, 
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3
//   },
//   emergencyCard: {
//     borderLeftWidth: 6,
//     borderLeftColor: '#e53935',
//     backgroundColor: '#ffe6e6'
//   },
//   emergencyLabel: {
//     color: '#d32f2f',
//     fontWeight: 'bold',
//     marginBottom: 5,
//     fontSize: 15
//   },
//   itemRow: { flexDirection: 'row', alignItems: 'center' },
//   itemImage: { width: 110, height: 110, borderRadius: 12, marginRight: 12 },
//   itemDetails: { flex: 1 },
//   itemTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
//   itemText: { fontSize: 14, color: '#555', marginBottom: 2 },
// });







import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Animated, Dimensions 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
  { id: "1", name: "Wallet", image: require("../assets/wallet.png") },
  { id: "2", name: "Watch", image: require("../assets/watch.png") },
  { id: "3", name: "Cap", image: require("../assets/cap.png") },
  { id: "4", name: "Umbrella", image: require("../assets/umbrella.png") },
  { id: "5", name: "Bag", image: require("../assets/bag.png") },
  { id: "6", name: "Phone", image: require("../assets/phone.png") },
  { id: "7", name: "Bottle", image: require("../assets/bottle.png") },
  { id: "8", name: "Other", image: require("../assets/others.png") },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation, route }) {
  const user = route.params?.user;
  const token = route.params?.token;

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH * 0.6))[0];

  // Fetch all items
  const fetchAllItems = useCallback(async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedItems = response.data.sort((a, b) => {
        if (a.emergency && !b.emergency) return -1;
        if (!a.emergency && b.emergency) return 1;
        return 0;
      });

      setItems(sortedItems);
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

  // Toggle side menu
  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -SCREEN_WIDTH * 0.6 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (screen, params = {}) => {
    toggleMenu();
    navigation.navigate(screen, { user, token, ...params });
  };

  const handleCategoryPress = (catName) => {
    setCategory(catName);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
        params: { category },
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedSearchResults = response.data.sort((a, b) => {
        if (a.emergency && !b.emergency) return -1;
        if (!a.emergency && b.emergency) return 1;
        return 0;
      });

      setItems(sortedSearchResults);
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert("Error", "Search failed.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetail', { item, user, token })}
      style={[styles.itemCard, item.emergency && styles.emergencyCard]}
    >
      {item.emergency && <Text style={styles.emergencyLabel}>⚠️ Emergency </Text>}
      <View style={styles.itemRow}>
        <Image 
          source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
          style={styles.itemImage} 
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>Category: {item.category}</Text>
          <Text style={styles.itemText}>Location: {item.location}</Text>
          <Text style={styles.itemText}>Status: {item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
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

      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Category" 
          value={category} 
          onChangeText={setCategory} 
          style={styles.input} 
        />
        <TouchableOpacity onPress={handleSearch}>
          <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
            <Text style={styles.buttonText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f9ff' }}>
      
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ionicons name={menuOpen ? "close" : "menu"} size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Home</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
      />

      {/* Side menu */}
      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('PostItem')}>
          <Ionicons name="add-circle-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Post New Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('MyReports')}>
          <Ionicons name="document-text-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>My Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('ReportFound')}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Report Found</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3578c6', paddingVertical: 12, paddingHorizontal: 15 },
  menuButton: { marginRight: 15 },
  topTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },

  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#1b3358' },
  category: { alignItems: 'center', marginRight: 15 },
  categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
  categoryText: { fontSize: 12, fontWeight: '600' },

  searchContainer: { marginVertical: 10 },
  input: { 
    borderWidth: 1, 
    borderColor: '#dae8f9', 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 8,
    backgroundColor: '#fff'
  },
  gradientButton: { 
    padding: 12,
    borderRadius: 10, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  itemCard: { 
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  emergencyCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#e53935',
    backgroundColor: '#ffe6e6'
  },
  emergencyLabel: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 110, height: 110, borderRadius: 12, marginRight: 12 },
  itemDetails: { flex: 1 },
  itemTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  itemText: { fontSize: 14, color: '#555', marginBottom: 2 },

  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 10,
  },
  sideMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  sideMenuText: { fontSize: 16, fontWeight: '600', marginLeft: 10, color: '#3578c6' },
});
