import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ItemDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:24 }}>{item.name}</Text>
      <Text style={{ fontSize:18 }}>Location: {item.location}</Text>
      <Button title="Claim This Item" onPress={() => alert('Claim request sent!')} />
    </View>
  );
}
