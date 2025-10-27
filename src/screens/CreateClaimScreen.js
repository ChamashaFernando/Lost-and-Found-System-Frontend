

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// // ✅ Change BASE_URL according to your backend setup
// // Example: Android Emulator -> "http://10.0.2.2:8096/api/claims"
// // Physical device -> "http://<PC-IP>:8096/api/claims"
// const CLAIM_API_URL = "http://172.20.10.3:8096/api/claims";

// export default function CreateClaimScreen({ route, navigation }) {
//   const { itemId, userId, token } = route.params || {};

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // ✅ Ensure token is available, ESLint warning fixed
//   useEffect(() => {
//     if (!token) {
//       Alert.alert('Session expired', 'Please login again.');
//       navigation.replace('Login');
//     }
//   }, [navigation, token]);

//   const handleSubmit = async () => {
//     if (!message.trim()) {
//       Alert.alert('Validation', 'Please enter a claim message.');
//       return;
//     }

//     const claimData = {
//       message: message.trim(),
//       status: 'PENDING',
//       userId,
//       itemId,
//     };

//     console.log('Claim data to submit:', claimData);
//     console.log('Submitting claim to:', CLAIM_API_URL, 'with token:', token);

//     try {
//       setLoading(true);
//       const response = await axios.post(CLAIM_API_URL, claimData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // token pass
//         },
//       });

//       console.log('Submit response:', response.data);

//       Alert.alert('Success', 'Claim submitted!', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('ClaimList', { itemId, token }),
//         },
//       ]);

//       setMessage(''); // clear input
//     } catch (error) {
//       console.log('Submit claim error:', error.response?.data || error.message);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Failed to submit claim'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Submit a Claim</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your message..."
//         value={message}
//         onChangeText={setMessage}
//         multiline
//         editable={!loading}
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007BFF" />
//       ) : (
//         <Button title="Submit Claim" onPress={handleSubmit} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: '#fff',
//     textAlignVertical: 'top',
//     marginBottom: 20,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CLAIM_API_URL = "http://172.20.10.3:8096/api/claims";

export default function CreateClaimScreen({ route, navigation }) {
  const { itemId, userId, token } = route.params || {};

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      Alert.alert('Session expired', 'Please login again.');
      navigation.replace('Login');
    }
  }, [navigation, token]);

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('Validation', 'Please enter a claim message.');
      return;
    }

    const claimData = {
      message: message.trim(),
      status: 'PENDING',
      userId,
      itemId,
    };

    console.log('Claim data to submit:', claimData);
    console.log('Submitting claim to:', CLAIM_API_URL, 'with token:', token);

    try {
      setLoading(true);
      const response = await axios.post(CLAIM_API_URL, claimData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Submit response:', response.data);

      Alert.alert('Success', 'Claim submitted!');
      setMessage(''); // clear input

      // ✅ Previously: navigation.navigate('ClaimList', { itemId, token })
      // Removed automatic navigation after claim submission

    } catch (error) {
      console.log('Submit claim error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to submit claim'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a Claim</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your message..."
        value={message}
        onChangeText={setMessage}
        multiline
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Submit Claim" onPress={handleSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});
