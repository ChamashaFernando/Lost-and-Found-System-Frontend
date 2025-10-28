// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import axios from 'axios';

// export default function MyProfileScreen({ route }) {
//   const { user, token } = route.params; // Login වෙලා user info pass වෙයි
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fix: useCallback added
//   const fetchUserDetails = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://172.20.10.3:8096/api/users/${user.id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserData(response.data);
//     } catch (err) {
//       console.error("Fetch user error:", err);
//       Alert.alert("Error", "Failed to fetch user details.");
//     } finally {
//       setLoading(false);
//     }
//   }, [user.id, token]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#3578c6" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.center}>
//         <Text>No data found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Full Name:</Text>
//       <Text style={styles.value}>{userData.fullName}</Text>

//       <Text style={styles.label}>Email:</Text>
//       <Text style={styles.value}>{userData.email}</Text>

//       <Text style={styles.label}>Reputation Score:</Text>
//       <Text style={styles.value}>{userData.reputationScore}</Text>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f9ff'
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginTop: 15,
//     color: '#1b3358'
//   },
//   value: {
//     fontSize: 16,
//     marginTop: 5,
//     color: '#555'
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });




import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function MyProfileScreen({ route }) {
  const { user, token } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://172.20.10.3:8096/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (err) {
      console.error("Fetch user error:", err);
      Alert.alert("Error", "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  }, [user.id, token]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3578c6" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#555', fontSize: 16 }}>No data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
      
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{userData.fullName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Reputation Score</Text>
        <Text style={styles.value}>{userData.reputationScore}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3578c6',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#1b3358',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
  },
});
