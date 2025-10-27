import React, { useState } from 'react';
import { 
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function ReportFoundScreen({ route }) {
  const { userId, token } = route.params;

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          setPhotoUrl(response.assets[0].uri);
        }
      }
    );
  };

  const submitReport = async () => {
    if (!category || !description || !location) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const reportData = { category, description, location, photoUrl, userId };
      await axios.post('http://172.20.10.3:8096/api/found/report', reportData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert("Success", "Report submitted successfully!");

      setCategory('');
      setDescription('');
      setLocation('');
      setPhotoUrl('');
    } catch (error) {
      console.log("Error:", error.response?.data);
      Alert.alert("Error", "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Photo (optional)</Text>
      {photoUrl ? <Image source={{ uri: photoUrl }} style={styles.photo} /> : null}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>Pick Image</Text>
      </TouchableOpacity>

      <Button title={loading ? "Submitting..." : "Submit Report"} onPress={submitReport} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  photo: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
  photoButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  photoButtonText: { color: '#fff', fontWeight: 'bold' },
});
