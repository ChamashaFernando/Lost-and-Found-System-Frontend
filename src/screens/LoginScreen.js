


// import React, { useState } from 'react';
// import { 
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator 
// } from 'react-native';
// import axios from 'axios';
// import useCurrentLocation from '../hooks/useCurrentLocation';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const location = useCurrentLocation(); // { latitude, longitude }

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

//       Alert.alert('Login Successful', `Welcome ${user.fullName}`);
//       navigation.navigate('Home', { user, token }); // ✅ Pass user and token
//     } catch (error) {
//       console.log('Login error:', error.response?.data || error.message);
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

//       <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.link}>Don’t have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
//   title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
//   label: { fontSize: 16, marginBottom: 5, color: '#444', fontWeight: '500' },
//   input: { width: '100%', height: 45, borderWidth: 1, borderColor: '#ccc', marginBottom: 15, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff' },
//   button: { backgroundColor: '#4a90e2', paddingVertical: 12, borderRadius: 8, marginTop: 10, marginBottom: 15 },
//   buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
//   link: { color: '#4a90e2', textAlign: 'center', fontSize: 14, marginTop: 5 }
// });



import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import useCurrentLocation from '../hooks/useCurrentLocation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useCurrentLocation(); // { latitude, longitude }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    if (!location.latitude || !location.longitude) {
      Alert.alert('Location Error', 'Unable to get your current location. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://172.20.10.3:8096/api/users/login', {
        email,
        password,
        latitude: location.latitude,
        longitude: location.longitude,
      });

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
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
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
    backgroundColor: '#f9f9f9' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30, 
    color: '#333' 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#444', 
    fontWeight: '500' 
  },
  input: { 
    width: '100%', 
    height: 45, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginBottom: 15, 
    paddingHorizontal: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff' 
  },
  button: { 
    backgroundColor: '#4a90e2', 
    paddingVertical: 12, 
    borderRadius: 8, 
    marginTop: 10, 
    marginBottom: 15 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  link: { 
    color: '#4a90e2', 
    textAlign: 'center', 
    fontSize: 14, 
    marginTop: 5 
  },
});
