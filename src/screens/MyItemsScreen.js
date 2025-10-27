import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getItemsByUser } from '../api/item';

export default function MyItemsScreen({ route }) {
  const [items, setItems] = useState([]);
  const userId = route.params?.userId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getItemsByUser(userId);
      setItems(response.data);
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>My Posted Items</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

