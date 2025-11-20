


// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Alert, 
//   ActivityIndicator 
// } from 'react-native';
// import axios from 'axios';
// import messaging from '@react-native-firebase/messaging';
// import useCurrentLocation from '../hooks/useCurrentLocation';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const location = useCurrentLocation(); // { latitude, longitude }

//   useEffect(() => {
//     // 🔹 Request notification permission on app start
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
//         console.log('✅ Notification permission granted.');
//       } else {
//         console.log('❌ Notification permission denied.');
//       }
//     };

//     requestPermission();
//   }, []);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Email and password are required.');
//       return;
//     }

//     if (!location.latitude || !location.longitude) {
//       Alert.alert('Location Error', 'Unable to get your current location. Please try again.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // 🔹 Login request
//       const response = await axios.post('http://172.20.10.3:8096/api/users/login', {
//         email,
//         password,
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });

//       const token = response.data.token;
//       const user = {
//         id: response.data.id,
//         fullName: response.data.fullName,
//         email: response.data.email,
//         role: response.data.role,
//         languagePreference: response.data.languagePreference,
//         reputationScore: response.data.reputationScore,
//         verified: response.data.verified,
//       };

//       if (!token || !user.id) {
//         Alert.alert('Error', 'User data missing in response');
//         return;
//       }

//       console.log('✅ Login success:', user);

//       // 🔹 Get FCM token and save to backend
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         try {
//           await axios.post(
//             `http://172.20.10.3:8096/api/users/${user.id}/token`,
//             { fcmToken },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           console.log('✅ FCM token saved successfully');
//         } catch (err) {
//           console.warn('⚠️ Failed to save FCM token:', err.response?.data || err.message);
//         }
//       }

//       // ✅ Role-based navigation
//       if (user.role === 'ADMIN') {
//         Alert.alert('Login Successful', `Welcome Admin ${user.fullName}`);
//         navigation.replace('Home', { user, token });
//       } else if (user.role === 'STUDENT') {
//         Alert.alert('Login Successful', `Welcome ${user.fullName}`);
//         navigation.replace('StudentHome', { user, token });
//       } else {
//         Alert.alert('Access Denied', 'Your role is not authorized.');
//       }

//     } catch (error) {
//       console.log('❌ Login error:', error.response?.data || error.message);
//       Alert.alert(
//         'Login Failed',
//         error.response?.data?.message || 'Invalid credentials'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         placeholder="Enter your password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={handleLogin} 
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.link}>Don’t have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     padding: 20, 
//     backgroundColor: '#f9f9f9' 
//   },
//   title: { 
//     fontSize: 28, 
//     fontWeight: 'bold', 
//     textAlign: 'center', 
//     marginBottom: 30, 
//     color: '#333' 
//   },
//   label: { 
//     fontSize: 16, 
//     marginBottom: 5, 
//     color: '#444', 
//     fontWeight: '500' 
//   },
//   input: { 
//     width: '100%', 
//     height: 45, 
//     borderWidth: 1, 
//     borderColor: '#ccc', 
//     marginBottom: 15, 
//     paddingHorizontal: 10, 
//     borderRadius: 8, 
//     backgroundColor: '#fff' 
//   },
//   button: { 
//     backgroundColor: '#4a90e2', 
//     paddingVertical: 12, 
//     borderRadius: 8, 
//     marginTop: 10, 
//     marginBottom: 15 
//   },
//   buttonText: { 
//     color: '#fff', 
//     textAlign: 'center', 
//     fontSize: 16, 
//     fontWeight: 'bold' 
//   },
//   link: { 
//     color: '#4a90e2', 
//     textAlign: 'center', 
//     fontSize: 14, 
//     marginTop: 5 
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import useCurrentLocation from '../hooks/useCurrentLocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // ✅ Make sure you have this installed

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle state

  const location = useCurrentLocation(); // { latitude, longitude }

  useEffect(() => {
    // 🔹 Request notification permission on app start
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('✅ Notification permission granted.');
      } else {
        console.log('❌ Notification permission denied.');
      }
    };

    requestPermission();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    if (!location.latitude || !location.longitude) {
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again.'
      );
      return;
    }

    setLoading(true);

    try {
      // 🔹 Login request
      const response = await axios.post(
        'http://172.20.10.3:8096/api/users/login',
        {
          email,
          password,
          latitude: location.latitude,
          longitude: location.longitude,
        }
      );

      const token = response.data.token;
      const user = {
        id: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email,
        role: response.data.role,
        languagePreference: response.data.languagePreference,
        reputationScore: response.data.reputationScore,
        verified: response.data.verified,
      };

      if (!token || !user.id) {
        Alert.alert('Error', 'User data missing in response');
        return;
      }

      console.log('✅ Login success:', user);

      // 🔹 Get FCM token and save to backend
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        try {
          await axios.post(
            `http://172.20.10.3:8096/api/users/${user.id}/token`,
            { fcmToken },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('✅ FCM token saved successfully');
        } catch (err) {
          console.warn(
            '⚠️ Failed to save FCM token:',
            err.response?.data || err.message
          );
        }
      }

      // ✅ Role-based navigation
      if (user.role === 'ADMIN') {
        Alert.alert('Login Successful', `Welcome Admin ${user.fullName}`);
        navigation.replace('Home', { user, token });
      } else if (user.role === 'STUDENT') {
        Alert.alert('Login Successful', `Welcome ${user.fullName}`);
        navigation.replace('StudentHome', { user, token });
      } else {
        Alert.alert('Access Denied', 'Your role is not authorized.');
      }
    } catch (error) {
      console.log('❌ Login error:', error.response?.data || error.message);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // 🔹 Toggle secure entry
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          style={styles.eyeButton}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4a90e2',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
});
