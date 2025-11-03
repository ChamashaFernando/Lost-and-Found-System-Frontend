


// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, Animated, Dimensions, TextInput 
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const categories = [
//   { id: "1", name: "Wallet", image: require("../assets/wallet.png") },
//   { id: "2", name: "Watch", image: require("../assets/watch.png") },
//   { id: "3", name: "Cap", image: require("../assets/cap.png") },
//   { id: "4", name: "Umbrella", image: require("../assets/umbrella.png") },
//   { id: "5", name: "Bag", image: require("../assets/bag.png") },
//   { id: "6", name: "Phone", image: require("../assets/phone.png") },
//   { id: "7", name: "Bottle", image: require("../assets/bottle.png") },
//   { id: "8", name: "Others", image: require("../assets/others.png") },
// ];

// const SCREEN_WIDTH = Dimensions.get('window').width;

// export default function StudentHomeScreen({ navigation, route }) {
//   const user = route.params?.user;
//   const token = route.params?.token;

//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);
//   const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH * 0.6))[0];

//   const fetchAllItems = useCallback(async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

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

//   const toggleMenu = () => {
//     Animated.timing(slideAnim, {
//       toValue: menuOpen ? -SCREEN_WIDTH * 0.6 : 0,
//       duration: 300,
//       useNativeDriver: false
//     }).start();
//     setMenuOpen(!menuOpen);
//   };

//   const handleNavigation = (screen, params = {}) => {
//     toggleMenu();
//     navigation.navigate(screen, { user, token, ...params });
//   };

//   const handleCategoryPress = (catName) => {
//     setCategory(catName);
//     const filtered = items.filter(i => i.category === catName);
//     setItems(filtered);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
//         params: { category, emergency: false },
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

//   const renderHeader = () => (
//     <View>
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
//         contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
//       />
//       <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
//         <TextInput
//           placeholder="Category"
//           value={category}
//           onChangeText={setCategory}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={handleSearch}>
//           <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.gradientButton}>
//             <Text style={styles.buttonText}>Search</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f5f9ff' }}>

//       {/* Top bar */}
//       <View style={styles.topBar}>
//         <Text style={styles.topTitle}>Lost & Found Items</Text>
//       </View>

//       {/* Arrow / Menu Button on top of everything */}
//       <TouchableOpacity 
//         onPress={toggleMenu} 
//         style={[styles.menuButton, { zIndex: 20, position: 'absolute', left: 15, top: 12 }]}
//       >
//         <Ionicons name={menuOpen ? "arrow-back-outline" : "menu"} size={28} color="#fff" />
//       </TouchableOpacity>

//       {/* Items list */}
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('StudentItemDetails', { item, user, token })}
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

//       {/* Side menu */}
//       <Animated.View style={[styles.sideMenu, { left: slideAnim, zIndex: 10 }]}>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('PostItem')}>
//           <Ionicons name="add-circle-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>Post New Item</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('ReportFound')}>
//           <Ionicons name="checkmark-circle-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>Report Found</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('Chat')}>
//           <Ionicons name="chatbubble-ellipses-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('MyPostedItems')}>
//           <Ionicons name="document-text-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>My Posted Items</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('MyProfile')}>
//           <Ionicons name="person-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>My Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('Notifications')}>
//           <Ionicons name="notifications-outline" size={22} color="#3578c6" />
//           <Text style={styles.sideMenuText}>Notifications</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3578c6', paddingVertical: 12, paddingHorizontal: 15 },
//   menuButton: { marginRight: 15 },
//   topTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },

//   category: { alignItems: 'center', marginRight: 15 },
//   categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
//   categoryText: { fontSize: 12, fontWeight: '600' },

//   input: { 
//     borderWidth: 1, 
//     borderColor: '#dae8f9', 
//     borderRadius: 8, 
//     padding: 10, 
//     backgroundColor: '#fff',
//     marginBottom: 8
//   },
//   gradientButton: { 
//     padding: 12,
//     borderRadius: 10, 
//     alignItems: 'center', 
//     marginBottom: 5,
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
//   emergencyLabel: { color: '#d32f2f', fontWeight: 'bold', marginBottom: 5, fontSize: 15 },
//   itemRow: { flexDirection: 'row', alignItems: 'center' },
//   itemImage: { width: 110, height: 110, borderRadius: 12, marginRight: 12 },
//   itemDetails: { flex: 1 },
//   itemTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
//   itemText: { fontSize: 14, color: '#555', marginBottom: 2 },

//   sideMenu: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     width: SCREEN_WIDTH * 0.6,
//     backgroundColor: '#fff',
//     paddingTop: 60,
//     paddingHorizontal: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 3, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   sideMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
//   sideMenuText: { fontSize: 16, fontWeight: '600', marginLeft: 10, color: '#3578c6' },
// });







import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, Animated, Dimensions, TextInput 
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
  { id: "8", name: "Others", image: require("../assets/others.png") },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function StudentHomeScreen({ navigation, route }) {
  const user = route.params?.user;
  const token = route.params?.token;

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH * 0.6))[0];

  // Fetch all items from backend
  const fetchAllItems = useCallback(async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sort emergency items on top
      const sortedItems = response.data.sort((a, b) => {
        if (a.emergency && !b.emergency) return -1;
        if (!a.emergency && b.emergency) return 1;
        return 0;
      });

      setItems(sortedItems);
    } catch (err) {
      console.error('Fetch items error:', err);
      if (err.response) console.error('Backend response:', err.response.data);
      if (err.request) console.error('No response received:', err.request);
      Alert.alert("Error", "Failed to load items. Check console for details.");
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
    const filtered = items.filter(i => i.category === catName);
    setItems(filtered);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/items/search', {
        params: { category, emergency: false },
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
      if (err.response) console.error('Backend response:', err.response.data);
      if (err.request) console.error('No response received:', err.request);
      Alert.alert("Error", "Search failed. Check console for details.");
    }
  };

  const renderHeader = () => (
    <View>
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
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
      <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
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
        <Text style={styles.topTitle}>Lost & Found Items</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity 
        onPress={toggleMenu} 
        style={[styles.menuButton, { zIndex: 20, position: 'absolute', left: 15, top: 12 }]}
      >
        <Ionicons name={menuOpen ? "arrow-back-outline" : "menu"} size={28} color="#fff" />
      </TouchableOpacity>

      {/* Items list */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigation('StudentItemDetails', { item })}
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
        )}
        ListHeaderComponent={renderHeader}
      />

      {/* Side menu */}
      <Animated.View style={[styles.sideMenu, { left: slideAnim, zIndex: 10 }]}>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('PostItem')}>
          <Ionicons name="add-circle-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Post New Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('ReportFound')}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Report Found</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('Chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('MyPostedItems')}>
          <Ionicons name="document-text-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>My Posted Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('MyProfile')}>
          <Ionicons name="person-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuItem} onPress={() => handleNavigation('Notifications')}>
          <Ionicons name="notifications-outline" size={22} color="#3578c6" />
          <Text style={styles.sideMenuText}>Notifications</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3578c6', paddingVertical: 12, paddingHorizontal: 15 },
  menuButton: { marginRight: 15 },
  topTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },

  category: { alignItems: 'center', marginRight: 15 },
  categoryImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
  categoryText: { fontSize: 12, fontWeight: '600' },

  input: { 
    borderWidth: 1, 
    borderColor: '#dae8f9', 
    borderRadius: 8, 
    padding: 10, 
    backgroundColor: '#fff',
    marginBottom: 8
  },
  gradientButton: { 
    padding: 12,
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 5,
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
  emergencyLabel: { color: '#d32f2f', fontWeight: 'bold', marginBottom: 5, fontSize: 15 },
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
  },
  sideMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  sideMenuText: { fontSize: 16, fontWeight: '600', marginLeft: 10, color: '#3578c6' },
});
