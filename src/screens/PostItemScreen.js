


// import React, { useState, useEffect } from 'react';
// import { 
//   View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, Switch, Image, TouchableOpacity, BackHandler 
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';

// export default function PostItemScreen({ navigation, route }) {
//   const { user, token } = route.params;

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');
//   const [status, setStatus] = useState('LOST');
//   const [emergency, setEmergency] = useState(false);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const backAction = () => {
//       if (user.role === 'STUDENT') {
//         navigation.navigate('StudentHome', { user, token });
//       } else if (user.role === 'ADMIN') {
//         navigation.navigate('Home', { user, token });
//       }
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction
//     );

//     return () => backHandler.remove();
//   }, [navigation, user, token]);

//   useEffect(() => {
//     if (!user || !token) {
//       Alert.alert('Error', 'User not logged in');
//       navigation.navigate('Login');
//     }
//   }, [user, token, navigation]);

//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
//       if (response.didCancel) return;
//       if (response.errorCode) Alert.alert('Error', response.errorMessage);
//       else setImage(response.assets[0]);
//     });
//   };

//   const handlePost = async () => {
//     if (!title || !category || !location) {
//       Alert.alert('Validation Error', 'Please fill all required fields');
//       return;
//     }
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('item', JSON.stringify({
//         title, description, category, status, location, date: new Date().toISOString(),
//         emergency, userId: user.id
//       }));
//       if (image) {
//         formData.append('image', {
//           uri: image.uri,
//           name: image.fileName || `${title}_${Date.now()}.jpg`,
//           type: image.type || 'image/jpeg'
//         });
//       }

//       await axios.post(
//         'http://172.20.10.3:8096/api/items/add',
//         formData,
//         { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
//       );

//       Alert.alert('Success', 'Item posted successfully');

//       if (user.role === 'STUDENT') {
//         navigation.navigate('StudentHome', { user, token });
//       } else if (user.role === 'ADMIN') {
//         navigation.navigate('Home', { user, token });
//       }

//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to post item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
//       <Text style={styles.header}>Post Lost/Found Item</Text>

//       <Text style={styles.label}>Title</Text>
//       <TextInput 
//         placeholder="Enter title" 
//         value={title} 
//         onChangeText={setTitle} 
//         style={styles.input} 
//         placeholderTextColor="#8faedc"
//       />

//       <Text style={styles.label}>Description</Text>
//       <TextInput 
//         placeholder="Enter description" 
//         value={description} 
//         onChangeText={setDescription} 
//         style={[styles.input, { height: 100 }]} 
//         multiline
//         placeholderTextColor="#8faedc"
//       />

//       <Text style={styles.label}>Category</Text>
//       <TextInput 
//         placeholder="Enter category" 
//         value={category} 
//         onChangeText={setCategory} 
//         style={styles.input} 
//         placeholderTextColor="#8faedc"
//       />

//       <Text style={styles.label}>Location</Text>
//       <TextInput 
//         placeholder="Enter location" 
//         value={location} 
//         onChangeText={setLocation} 
//         style={styles.input} 
//         placeholderTextColor="#8faedc"
//       />

//       <Text style={styles.label}>Status</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.switchLabel}>{status}</Text>
//         <TouchableOpacity 
//           style={[styles.statusButton, { backgroundColor: status === 'LOST' ? '#4a90e2' : '#3578c6' }]}
//           onPress={() => setStatus(status === 'LOST' ? 'FOUND' : 'LOST')}
//         >
//           <Text style={styles.buttonText}>{status === 'LOST' ? 'Mark as FOUND' : 'Mark as LOST'}</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Emergency</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.switchLabel}>Is this urgent?</Text>
//         <Switch value={emergency} onValueChange={setEmergency} thumbColor={emergency ? '#4a90e2' : '#ccc'} />
//       </View>

//       <Text style={styles.label}>Photo (optional)</Text>
//       <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//         <Text style={styles.buttonText}>{image ? 'Change Image' : 'Pick an Image'}</Text>
//       </TouchableOpacity>

//       {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

//       <TouchableOpacity 
//         style={[styles.submitButton, loading && { backgroundColor: '#aac4eb' }]} 
//         onPress={handlePost} 
//         disabled={loading}
//       >
//         <Text style={styles.submitButtonText}>{loading ? 'Posting...' : 'Post Item'}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f9ff', padding: 20 },
//   header: { fontSize: 24, fontWeight: 'bold', color: '#4a90e2', marginBottom: 20, textAlign: 'center' },
//   label: { fontSize: 16, fontWeight: '600', color: '#3578c6', marginBottom: 5, marginTop: 10 },
//   input: { borderWidth: 1, borderColor: '#3578c6', borderRadius: 12, padding: 12, marginBottom: 10, backgroundColor: '#fff', fontSize: 16 },
//   switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
//   switchLabel: { fontSize: 16, color: '#3578c6', fontWeight: '600' },
//   statusButton: { padding: 10, borderRadius: 12, alignItems: 'center' },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   imagePicker: { backgroundColor: '#4a90e2', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
//   imagePreview: { width: '100%', height: 200, borderRadius: 12, marginVertical: 10, borderWidth: 1, borderColor: '#3578c6' },
//   submitButton: { backgroundColor: '#3578c6', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
//   submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
// });




import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Switch, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, BackHandler 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function PostItemScreen({ navigation, route }) {
  const { user, token } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('LOST');
  const [emergency, setEmergency] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // ✅ new field
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (user.role === 'STUDENT') navigation.navigate('StudentHome', { user, token });
      else if (user.role === 'ADMIN') navigation.navigate('Home', { user, token });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, user, token]);

  useEffect(() => {
    if (!user || !token) {
      Alert.alert('Error', 'User not logged in');
      navigation.navigate('Login');
    }
  }, [user, token, navigation]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) Alert.alert('Error', response.errorMessage);
      else setImage(response.assets[0]);
    });
  };

  const handlePost = async () => {
    if (!title || !category || !location || !phoneNumber) {
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
        userId: user.id,
        phoneNumber, // ✅ include phone number
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
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      Alert.alert('Success', 'Item posted successfully');

      if (user.role === 'STUDENT') navigation.navigate('StudentHome', { user, token });
      else if (user.role === 'ADMIN') navigation.navigate('Home', { user, token });

    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>Post Lost/Found Item</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput 
        placeholder="Enter title" 
        value={title} 
        onChangeText={setTitle} 
        style={styles.input} 
        placeholderTextColor="#8faedc"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        placeholder="Enter description" 
        value={description} 
        onChangeText={setDescription} 
        style={[styles.input, { height: 100 }]} 
        multiline
        placeholderTextColor="#8faedc"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput 
        placeholder="Enter category" 
        value={category} 
        onChangeText={setCategory} 
        style={styles.input} 
        placeholderTextColor="#8faedc"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput 
        placeholder="Enter location" 
        value={location} 
        onChangeText={setLocation} 
        style={styles.input} 
        placeholderTextColor="#8faedc"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
        placeholderTextColor="#8faedc"
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{status}</Text>
        <TouchableOpacity 
          style={[styles.statusButton, { backgroundColor: status === 'LOST' ? '#4a90e2' : '#3578c6' }]}
          onPress={() => setStatus(status === 'LOST' ? 'FOUND' : 'LOST')}
        >
          <Text style={styles.buttonText}>{status === 'LOST' ? 'Mark as FOUND' : 'Mark as LOST'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Emergency</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Is this urgent?</Text>
        <Switch value={emergency} onValueChange={setEmergency} thumbColor={emergency ? '#4a90e2' : '#ccc'} />
      </View>

      <Text style={styles.label}>Photo (optional)</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.buttonText}>{image ? 'Change Image' : 'Pick an Image'}</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <TouchableOpacity 
        style={[styles.submitButton, loading && { backgroundColor: '#aac4eb' }]} 
        onPress={handlePost} 
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>{loading ? 'Posting...' : 'Post Item'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f9ff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#4a90e2', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#3578c6', marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#3578c6', borderRadius: 12, padding: 12, marginBottom: 10, backgroundColor: '#fff', fontSize: 16 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  switchLabel: { fontSize: 16, color: '#3578c6', fontWeight: '600' },
  statusButton: { padding: 10, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  imagePicker: { backgroundColor: '#4a90e2', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  imagePreview: { width: '100%', height: 200, borderRadius: 12, marginVertical: 10, borderWidth: 1, borderColor: '#3578c6' },
  submitButton: { backgroundColor: '#3578c6', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
