import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getItemsByUser } from '../api/items';

export default function MyHistoryScreen({ route }) {
  const userId = route.params.userId;
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchUserItems();
  }, []);

  const fetchUserItems = async () => {
    try {
      const data = await getItemsByUser(userId);
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding:20 }}>
      <Text style={{ fontSize:24 }}>My Items</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding:10, borderBottomWidth:1 }}>
            <Text>{item.title}</Text>
            <Text>{item.location}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}
