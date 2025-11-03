

// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   View, Text, FlatList, StyleSheet, RefreshControl, Alert, TouchableOpacity 
// } from 'react-native';
// import axios from 'axios';

// export default function NotificationScreen({ route }) {
//   const { user, token } = route.params;

//   const [notifications, setNotifications] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch notifications
//   const fetchNotifications = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://172.20.10.3:8096/api/notifications/${user.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log('Fetched notifications:', response.data);
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       Alert.alert("Error", "Failed to load notifications.");
//     }
//   }, [user.id, token]);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchNotifications().finally(() => setRefreshing(false));
//   }, [fetchNotifications]);

//   const renderItem = ({ item }) => (
//     <View style={[styles.notificationCard, item.seen ? {} : styles.unread]}>
//       <Text style={styles.notificationTitle}>{item.title}</Text>
//       <Text style={styles.notificationMessage}>{item.message}</Text>
//       <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleString()}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No notifications found</Text>
//           </View>
//         }
//         contentContainerStyle={{ padding: 10 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f9ff' },
//   notificationCard: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   unread: {
//     borderLeftWidth: 4,
//     borderLeftColor: '#3578c6',
//   },
//   notificationTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
//   notificationMessage: { fontSize: 14, color: '#555' },
//   notificationDate: { fontSize: 12, color: '#999', marginTop: 4 },
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
//   emptyText: { color: '#555', fontSize: 16 },
// });




import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, StyleSheet, RefreshControl, Alert, TouchableOpacity 
} from 'react-native';
import axios from 'axios';

export default function NotificationScreen({ route, navigation }) {
  const { user, token } = route.params;

  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`http://172.20.10.3:8096/api/notifications/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched notifications:', response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert("Error", "Failed to load notifications.");
    }
  }, [user.id, token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications().finally(() => setRefreshing(false));
  }, [fetchNotifications]);

  // When notification is clicked, navigate to StudentItemDetails
  const handleNotificationPress = (notification) => {
    if (!notification.item) {
      Alert.alert("Error", "No item associated with this notification.");
      return;
    }

    navigation.navigate('StudentItemDetails', {
      item: notification.item,
      user,
      token
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.seen ? {} : styles.unread]}
      onPress={() => handleNotificationPress(item)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications found</Text>
          </View>
        }
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f9ff' },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#3578c6',
  },
  notificationTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  notificationMessage: { fontSize: 14, color: '#555' },
  notificationDate: { fontSize: 12, color: '#999', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#555', fontSize: 16 },
});
