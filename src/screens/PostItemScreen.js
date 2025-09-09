import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function PostItemScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handlePost = () => {
    alert(`Item: ${name}\nLocation: ${location}`);
  };

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>Post Lost/Found Item</Text>
      <TextInput placeholder="Item Name" value={name} onChangeText={setName} style={{borderWidth:1, marginBottom:10, padding:8}} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{borderWidth:1, marginBottom:10, padding:8}} />
      <Button title="Post Item" onPress={handlePost} />
    </View>
  );
}
