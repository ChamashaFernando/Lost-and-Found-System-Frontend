import React, { useEffect, useState, useCallback } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet 
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";

export default function MyPostedItemsScreen({ navigation, route }) {
  const user = route.params?.user;
  const token = route.params?.token;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch user's posted items
  const fetchUserItems = useCallback(async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://172.20.10.3:8096/api/items/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    } catch (err) {
      console.error("Fetch user items error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to load your items.");
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchUserItems();
  }, [fetchUserItems]);

  // 🔹 Delete item
  const handleDeleteItem = async (itemId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://172.20.10.3:8096/api/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              Alert.alert("Deleted", "Item deleted successfully.");
              fetchUserItems(); // Refresh list
            } catch (err) {
              console.error("Delete item error:", err.response?.data || err.message);
              Alert.alert("Error", "Failed to delete item.");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
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

      <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={{ marginTop: 10 }}>
        <LinearGradient colors={['#e53935', '#d32f2f']} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#f5f9ff' }}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => !loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>No items posted yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  itemText: { fontSize: 14, color: '#555', marginBottom: 2 },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
