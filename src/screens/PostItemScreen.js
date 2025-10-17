import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Switch, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function PostItemScreen({ navigation, route }) {
  const { user, token } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('LOST'); // LOST or FOUND
  const [emergency, setEmergency] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      Alert.alert('Error', 'User not logged in');
      navigation.navigate('Login');
    }
  }, [user, token]);

  // 🌟 Image Picker
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage);
        } else {
          const asset = response.assets[0];
          setImage(asset);
        }
      }
    );
  };

  const handlePost = async () => {
    if (!title || !category || !location) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('item', JSON.stringify({
        title,
        description,
        category,
        status,
        location,
        date: new Date().toISOString(),
        emergency,
        userId: user.id
      }));

      if (image) {
        formData.append('image', {
          uri: image.uri,
          name: image.fileName || `${title}_${Date.now()}.jpg`,
          type: image.type || 'image/jpeg'
        });
      }

      await axios.post(
        'http://172.20.10.3:8096/api/items/add',
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
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

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={{ color: '#fff' }}>{image ? 'Change Image' : 'Pick an Image'}</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
        />
      )}

      <Button title={loading ? 'Posting...' : 'Post Item'} onPress={handlePost} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  imagePicker: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 15 }
});
