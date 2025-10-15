
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
// import { createItem } from '../api/items';

// export default function PostItemScreen({ navigation, route }) {
//   const userId = route.params?.userId; // route params eken ganna
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');
//   const [status, setStatus] = useState('LOST'); // default enum
//   const [emergency, setEmergency] = useState(false);

//   const handlePost = async () => {
//     if (!userId) {
//       Alert.alert('Error', 'User not logged in');
//       navigation.navigate('Login');
//       return;
//     }

//     if (!title || !category || !location) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const itemData = {
//       title,
//       description,
//       category,
//       status,          // LOST / FOUND
//       photoUrl: '',    // optional
//       location,
//       date: new Date().toISOString(),
//       emergency,
//       userId,
//     };

//     try {
//       await createItem(itemData);
//       Alert.alert('Success', 'Item posted successfully');
//       navigation.navigate('Home', { userId }); // navigate back to Home with userId
//     } catch (error) {
//       console.error('Post item error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to post item');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Post Lost/Found Item</Text>

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Category"
//         value={category}
//         onChangeText={setCategory}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Location"
//         value={location}
//         onChangeText={setLocation}
//         style={styles.input}
//       />

//       <Button title="Post Item" onPress={handlePost} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1 },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: { borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 10 }
// });





import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Switch 
} from 'react-native';
import axios from 'axios';

export default function PostItemScreen({ navigation, route }) {
  const { user, token } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('LOST'); // LOST or FOUND
  const [emergency, setEmergency] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if no user/token
  useEffect(() => {
    if (!user || !token) {
      Alert.alert('Error', 'User not logged in');
      navigation.navigate('Login');
    }
  }, [user, token]);

  const handlePost = async () => {
    if (!title || !category || !location) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    const itemData = {
      title,
      description,
      category,
      status,
      photoUrl: '', // optional
      location,
      date: new Date().toISOString(), // backend parses to LocalDateTime
      emergency,
      userId: user.id
    };

    try {
      await axios.post(
        'http://172.20.10.3:8096/api/items',
        itemData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Item posted successfully');
      navigation.navigate('Home', { user, token });
    } catch (error) {
      console.error('Post item error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to post item'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Post Lost/Found Item</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text>Status: {status}</Text>
        <Button
          title={status === 'LOST' ? 'Mark as FOUND' : 'Mark as LOST'}
          onPress={() => setStatus(status === 'LOST' ? 'FOUND' : 'LOST')}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Emergency:</Text>
        <Switch value={emergency} onValueChange={setEmergency} />
      </View>

      <Button title={loading ? 'Posting...' : 'Post Item'} onPress={handlePost} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }
});
