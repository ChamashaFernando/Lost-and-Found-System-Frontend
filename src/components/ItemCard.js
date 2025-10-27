import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemLocation}>Location: {item.location}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemLocation: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
