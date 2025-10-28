



// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   Image, 
//   StyleSheet, 
//   ActivityIndicator, 
//   Alert 
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';

// export default function MyReportsScreen({ route }) {
//   const { userId, token } = route.params;
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchReports = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://172.20.10.3:8096/api/found/user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setReports(response.data);
//     } catch (error) {
//       console.error('Fetch Reports Error:', error);
//       if (error.response) {
//         Alert.alert('Error', error.response.data.message || 'Failed to fetch reports');
//       } else if (error.request) {
//         Alert.alert('Error', 'No response from server. Check your network.');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, token]);

//   useEffect(() => {
//     fetchReports();
//   }, [fetchReports]);

//   const renderItem = ({ item }) => (
//     <View style={styles.reportCard}>
//       <LinearGradient 
//         colors={['#4a90e2', '#3578c6']} 
//         style={styles.cardHeader}
//         start={{ x: 0, y: 0 }} 
//         end={{ x: 1, y: 1 }}
//       >
//         <Text style={styles.category}>{item.category}</Text>
//       </LinearGradient>

//       <View style={styles.cardContent}>
//         <Text style={styles.description}>{item.description}</Text>
//         <Text style={styles.location}>📍 {item.location}</Text>
//         <Text style={styles.date}>
//           🕒 {new Date(item.reportedAt).toLocaleString()}
//         </Text>

//         {item.photoUrl ? (
//           <Image 
//             source={{ uri: item.photoUrl }} 
//             style={styles.photo} 
//             resizeMode="cover" 
//           />
//         ) : (
//           <Image 
//             source={require('../assets/no-image.png')} 
//             style={styles.photo} 
//             resizeMode="cover" 
//           />
//         )}
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4a90e2" />
//         <Text style={styles.loadingText}>Loading your reports...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>📋 My Reports</Text>

//       {reports.length === 0 ? (
//         <Text style={styles.noReportsText}>No reports found yet.</Text>
//       ) : (
//         <FlatList
//           data={reports}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 30 }}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 15, 
//     backgroundColor: '#f7faff' 
//   },
//   loadingContainer: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     backgroundColor: '#f7faff' 
//   },
//   loadingText: { 
//     marginTop: 10, 
//     color: '#4a90e2', 
//     fontSize: 16 
//   },
//   screenTitle: { 
//     fontSize: 22, 
//     fontWeight: 'bold', 
//     color: '#1a237e', 
//     textAlign: 'center', 
//     marginBottom: 18 
//   },
//   reportCard: { 
//     borderRadius: 14, 
//     overflow: 'hidden', 
//     backgroundColor: '#fff', 
//     marginVertical: 8, 
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardHeader: { 
//     paddingVertical: 10, 
//     paddingHorizontal: 15 
//   },
//   category: { 
//     color: '#fff', 
//     fontWeight: 'bold', 
//     fontSize: 17, 
//     textTransform: 'uppercase' 
//   },
//   cardContent: { 
//     padding: 15 
//   },
//   description: { 
//     fontSize: 15, 
//     fontWeight: '500', 
//     marginBottom: 6, 
//     color: '#333' 
//   },
//   location: { 
//     fontSize: 14, 
//     fontStyle: 'italic', 
//     color: '#555', 
//     marginBottom: 4 
//   },
//   date: { 
//     fontSize: 12, 
//     color: '#888', 
//     marginBottom: 10 
//   },
//   photo: { 
//     width: '100%', 
//     height: 200, 
//     borderRadius: 10, 
//     marginTop: 5 
//   },
//   noReportsText: { 
//     textAlign: 'center', 
//     marginTop: 40, 
//     fontSize: 16, 
//     color: '#777', 
//     fontStyle: 'italic' 
//   },
// });







import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

export default function AllReportsScreen({ route }) {
  const { token } = route.params; // userId one na, all reports ganna
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://172.20.10.3:8096/api/found/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
    } catch (error) {
      console.error('Fetch Reports Error:', error);
      Alert.alert('Error', 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const renderItem = ({ item }) => (
    <View style={styles.reportCard}>
      <LinearGradient colors={['#4a90e2', '#3578c6']} style={styles.cardHeader}>
        <Text style={styles.category}>{item.category}</Text>
      </LinearGradient>
      <View style={styles.cardContent}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.date}>🕒 {new Date(item.reportedAt).toLocaleString()}</Text>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={styles.photo} />
        ) : (
          <Image source={require('../assets/no-image.png')} style={styles.photo} />
        )}
        <Text style={styles.userName}>Reported by: {item.user.fullName}</Text>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#4a90e2" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>📋 All Users Reports</Text>
      {reports.length === 0 ? (
        <Text style={styles.noReportsText}>No reports found yet.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f7faff' },
  screenTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 18 },
  reportCard: { borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff', marginVertical: 8, elevation: 3 },
  cardHeader: { paddingVertical: 10, paddingHorizontal: 15 },
  category: { color: '#fff', fontWeight: 'bold', fontSize: 17, textTransform: 'uppercase' },
  cardContent: { padding: 15 },
  description: { fontSize: 15, fontWeight: '500', marginBottom: 6, color: '#333' },
  location: { fontSize: 14, fontStyle: 'italic', color: '#555', marginBottom: 4 },
  date: { fontSize: 12, color: '#888', marginBottom: 10 },
  photo: { width: '100%', height: 200, borderRadius: 10, marginTop: 5 },
  userName: { fontSize: 13, color: '#333', marginTop: 5, fontStyle: 'italic' },
  noReportsText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#777', fontStyle: 'italic' },
});
