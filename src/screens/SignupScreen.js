
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// export default function SignupScreen({ navigation }) {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [language, setLanguage] = useState('SINHALA');
//   const [role, setRole] = useState('STUDENT');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     if (!fullName || !email || !password) {
//       Alert.alert('Validation Error', 'Please fill all required fields.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://172.20.10.3:8096/api/users/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullName,
//           email,
//           password,
//           language,
//           role,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Signup successful!');
//         navigation.navigate('Login');
//       } else {
//         Alert.alert('Error', data.message || 'Signup failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to connect to server');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Signup</Text>

//       <Text style={styles.label}>Full Name</Text>
//       <TextInput
//         placeholder="Enter your full name"
//         value={fullName}
//         onChangeText={setFullName}
//         style={styles.input}
//       />

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

//       <Text style={styles.label}>Language</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={language}
//           onValueChange={(itemValue) => setLanguage(itemValue)}
//         >
//           <Picker.Item label="Sinhala" value="SINHALA" />
//           <Picker.Item label="Tamil" value="TAMIL" />
//           <Picker.Item label="English" value="ENGLISH" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Role</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={role}
//           onValueChange={(itemValue) => setRole(itemValue)}
//         >
//           <Picker.Item label="Student" value="STUDENT" />
//           <Picker.Item label="Admin" value="ADMIN" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
//         <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Signup'}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Login</Text>
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
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 15,
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
//   }
// });







import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons'; // 👈 eye icon use

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('SINHALA');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Role fixed to STUDENT
  const role = 'STUDENT';

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://172.20.10.3:8096/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          language,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password Field */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Language</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="Sinhala" value="SINHALA" />
          <Picker.Item label="Tamil" value="TAMIL" />
          <Picker.Item label="English" value="ENGLISH" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Signup'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  passwordInput: {
    flex: 1,
    height: 45
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
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
  }
});
