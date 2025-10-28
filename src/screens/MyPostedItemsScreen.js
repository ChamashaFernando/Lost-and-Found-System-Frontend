import React, { useEffect, useState, useCallback } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert 
} from "react-native";
import { getItemsByUser } from "../api/items";
import axios from "axios";

export default function MyPostedItemsScreen({ route, navigation }) {
  const { user, token } = route.params;
  const [items, setItems] = useState([]);

  const fetchMyItems = useCallback(async () => {
    try {
      const data = await getItemsByUser(user.id, token);
      setItems(data);
    } catch (err) {
      console.error("Fetch my items error:", err);
      Alert.alert("Error", "Items load කරන්න බැහැ.");
    }
  }, [user.id, token]);

  useEffect(() => {
    fetchMyItems();
  }, [fetchMyItems]);

  const handleDelete = async (itemId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: async () => {
          try {
            await axios.delete(`http://172.20.10.3:8096/api/items/${itemId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setItems(prev => prev.filter(item => item.id !== itemId));
            Alert.alert("Deleted", "Item deleted successfully.");
          } catch (err) {
            console.error("Delete item error:", err.response?.data || err.message);
            Alert.alert("Error", "Item delete කරන්න බැහැ.");
          }
        }}
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>Category: {item.category}</Text>
        <Text style={styles.itemText}>Location: {item.location}</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>

        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#f5f9ff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No items posted yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  itemImage: { width: 110, height: 110, borderRadius: 12, marginRight: 12 },
  itemDetails: { flex: 1 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  itemText: { fontSize: 14, color: '#555', marginBottom: 2 },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#e53935',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
