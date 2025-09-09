import React from 'react';
import { View, Text } from 'react-native';

export default function MyHistoryScreen() {
  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:24 }}>My Posts & Claims</Text>
      <Text>(List of items will appear here)</Text>
    </View>
  );
}
