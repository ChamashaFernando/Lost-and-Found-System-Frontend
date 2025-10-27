// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { getClaimsByItem, approveClaim } from '../api/claims';

// export default function ClaimListScreen({ navigation, route }) {
//   const { itemId, token } = route.params; // token passed from CreateClaimScreen
//   const [claims, setClaims] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch claims for item
//   const loadClaims = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Fetching claims for itemId:', itemId);
//       const data = await getClaimsByItem(itemId, token);
//       console.log('Claims fetched:', data);
//       setClaims(data);
//     } catch (error) {
//       console.error('❌ Load claims error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to load claims');
//     } finally {
//       setLoading(false);
//     }
//   }, [itemId, token]);

//   useEffect(() => {
//     loadClaims();
//   }, [loadClaims]);

//   const handleApprove = async (claimId) => {
//     try {
//       await approveClaim(claimId, token);
//       Alert.alert('Approved', 'Claim has been approved!');
//       loadClaims(); // refresh list
//     } catch (error) {
//       console.error('❌ Approve claim error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to approve claim');
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.message}>{item.message}</Text>
//       <Text>Status: {item.status}</Text>
//       <Text>User: {item.user?.fullName || 'Unknown'}</Text>
//       {item.status === 'PENDING' && (
//         <Button title="Approve" onPress={() => handleApprove(item.id)} />
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Claims for this Item</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />
//       ) : claims.length === 0 ? (
//         <Text>No claims found for this item.</Text>
//       ) : (
//         <FlatList
//           data={claims}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   message: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
// });



import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getClaimsByItem, approveClaim } from '../api/claims';

export default function ClaimListScreen({ navigation, route }) {
  const { itemId, token } = route.params;
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load claims safely with token + itemId
  const loadClaims = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getClaimsByItem(itemId, token);
      console.log("✅ Loaded claims:", data);
      setClaims(data);
    } catch (error) {
      console.error("❌ Failed to load claims:", error.response?.data || error.message);
      Alert.alert('Error', 'Failed to load claims. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [itemId, token]);

  useEffect(() => {
    loadClaims();
  }, [loadClaims]);

  const handleApprove = async (claimId) => {
    try {
      await approveClaim(claimId, token);
      Alert.alert('Approved', 'Claim has been approved successfully!');
      loadClaims(); // refresh list
    } catch (error) {
      console.error("❌ Approve claim error:", error.response?.data || error.message);
      Alert.alert('Error', 'Failed to approve claim');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>User: {item.user?.fullName || 'Unknown'}</Text>
      {item.status === 'PENDING' && (
        <Button title="Approve" color="#007BFF" onPress={() => handleApprove(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Claims for this Item</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : claims.length > 0 ? (
        <FlatList
          data={claims}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>No claims found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  message: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  text: { fontSize: 14, color: '#444' },
});
