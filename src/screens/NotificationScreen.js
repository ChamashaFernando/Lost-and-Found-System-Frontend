




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   Alert,
// } from 'react-native';

// export default function NotificationScreen({ route }) {
//   const notification = route?.params?.notification ?? {
//     title: 'Black Umbrella',
//     category: 'Umbrella',
//     location: 'Colombo',
//     status: 'Lost',
//     phone: '0763567766',
//     reportedAt: new Date().toISOString(),
//     description: 'Black umbrella lost near the faculty entrance. Please contact if found.',
//   };

//   const [showDetails, setShowDetails] = useState(false);

//   const handleCall = (phone) => {
//     if (!phone) return Alert.alert('No phone number', 'This notification has no phone number.');
//     const url = `tel:${phone}`;
//     Linking.canOpenURL(url)
//       .then((supported) => supported && Linking.openURL(url))
//       .catch(() => Alert.alert('Error', 'Failed to open dialer.'));
//   };

//   const handleCopy = (text) => Alert.alert('Info', text);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>🔔 {notification.title}</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Location:</Text>
//           <Text style={styles.value}>{notification.location}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Status:</Text>
//           <Text style={[styles.value, notification.status === 'Lost' ? styles.lost : styles.found]}>
//             {notification.status}
//           </Text>
//         </View>

//         <TouchableOpacity
//           onPress={() => setShowDetails(!showDetails)}
//           style={styles.moreButton}
//         >
//           <Text style={styles.moreText}>{showDetails ? 'Hide Info ▲' : 'More Info ▼'}</Text>
//         </TouchableOpacity>

//         {showDetails && (
//           <View style={styles.detailsContainer}>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Category:</Text>
//               <Text style={styles.detailValue}>{notification.category}</Text>
//             </View>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Phone:</Text>
//               <Text style={styles.detailValue}>{notification.phone}</Text>
//             </View>

//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Reported:</Text>
//               <Text style={styles.detailValue}>{new Date(notification.reportedAt).toLocaleString()}</Text>
//             </View>

//             {notification.description && (
//               <View style={{ marginTop: 6 }}>
//                 <Text style={styles.descTitle}>Description</Text>
//                 <Text style={styles.descriptionText}>{notification.description}</Text>
//               </View>
//             )}

//             <View style={styles.actions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.callButton]}
//                 onPress={() => handleCall(notification.phone)}
//               >
//                 <Text style={styles.actionText}>Call</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.actionButton, styles.copyButton]}
//                 onPress={() => handleCopy(`${notification.title} • ${notification.location}`)}
//               >
//                 <Text style={styles.copyText}>Copy Info</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 10, backgroundColor: '#f5f9ff', minHeight: '100%' },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 14,
//   },
//   title: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#1b3358' },
//   row: { flexDirection: 'row', marginTop: 2, alignItems: 'center' },
//   label: { width: 85, fontSize: 13, color: '#666', fontWeight: '600' },
//   value: { fontSize: 13, color: '#222', flex: 1 },
//   lost: { color: '#d32f2f', fontWeight: 'bold' },
//   found: { color: '#2e7d32', fontWeight: 'bold' },
//   moreButton: { marginTop: 4 },
//   moreText: { color: '#3578c6', fontWeight: '700', fontSize: 13 },
//   detailsContainer: { marginTop: 6, borderTopWidth: 0.5, borderTopColor: '#ccc', paddingTop: 6 },
//   detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
//   detailLabel: { fontSize: 13, fontWeight: '600', color: '#666' },
//   detailValue: { fontSize: 13, color: '#222', textAlign: 'right' },
//   descTitle: { fontSize: 13, color: '#333', fontWeight: '700', marginBottom: 2 },
//   descriptionText: { fontSize: 13, color: '#444', lineHeight: 18 },
//   actions: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
//   actionButton: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
//   callButton: { backgroundColor: '#3578c6' },
//   copyButton: { backgroundColor: '#e0e7ef' },
//   actionText: { color: '#fff', fontWeight: '700', fontSize: 13 },
//   copyText: { color: '#1b3358', fontWeight: '700', fontSize: 13 },
// });







import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationScreen({ route }) {
  const notification = route?.params?.notification ?? {
    title: 'Black Umbrella',
    category: 'Umbrella',
    location: 'Colombo',
    status: 'Lost',
    phone: '0763567766',
    reportedAt: new Date().toISOString(),
    description: 'Black umbrella lost near the faculty entrance. Please contact if found.',
  };

  const [showDetails, setShowDetails] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);

  const handleCall = (phone) => {
    if (!phone) return Alert.alert('No phone number', 'This notification has no phone number.');
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => supported && Linking.openURL(url))
      .catch(() => Alert.alert('Error', 'Failed to open dialer.'));
  };

  const handleCopy = (text) => Alert.alert('Info', text);

  const closePopup = () => setPopupVisible(false);

  const renderNotificationCard = () => (
    <View style={styles.card}>
      {/* Title row with close icon */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>🔔 {notification.title}</Text>
        <TouchableOpacity onPress={closePopup}>
          <Ionicons name="close-circle-outline" size={22} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{notification.location}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, notification.status === 'Lost' ? styles.lost : styles.found]}>
          {notification.status}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowDetails(!showDetails)}
        style={styles.moreButton}
      >
        <Text style={styles.moreText}>{showDetails ? 'Hide Info ▲' : 'More Info ▼'}</Text>
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{notification.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{notification.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reported:</Text>
            <Text style={styles.detailValue}>{new Date(notification.reportedAt).toLocaleString()}</Text>
          </View>

          {notification.description && (
            <View style={{ marginTop: 6 }}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.descriptionText}>{notification.description}</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={() => handleCall(notification.phone)}
            >
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.copyButton]}
              onPress={() => handleCopy(`${notification.title} • ${notification.location}`)}
            >
              <Text style={styles.copyText}>Copy Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f9ff' }}>
      {/* Popup notification */}
      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          {renderNotificationCard()}
        </View>
      </Modal>

      {/* Normal notification card below popup */}
      {!popupVisible && (
        <ScrollView contentContainerStyle={styles.container}>
          {renderNotificationCard()}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f9ff', minHeight: '100%' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    width: '100%',
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  title: { fontSize: 18, fontWeight: '700', color: '#1b3358', flex: 1 },
  row: { flexDirection: 'row', marginTop: 2, alignItems: 'center' },
  label: { width: 85, fontSize: 13, color: '#666', fontWeight: '600' },
  value: { fontSize: 13, color: '#222', flex: 1 },
  lost: { color: '#d32f2f', fontWeight: 'bold' },
  found: { color: '#2e7d32', fontWeight: 'bold' },
  moreButton: { marginTop: 4 },
  moreText: { color: '#3578c6', fontWeight: '700', fontSize: 13 },
  detailsContainer: { marginTop: 6, borderTopWidth: 0.5, borderTopColor: '#ccc', paddingTop: 6 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  detailLabel: { fontSize: 13, fontWeight: '600', color: '#666' },
  detailValue: { fontSize: 13, color: '#222', textAlign: 'right' },
  descTitle: { fontSize: 13, color: '#333', fontWeight: '700', marginBottom: 2 },
  descriptionText: { fontSize: 13, color: '#444', lineHeight: 18 },
  actions: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  actionButton: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  callButton: { backgroundColor: '#3578c6' },
  copyButton: { backgroundColor: '#e0e7ef' },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  copyText: { color: '#1b3358', fontWeight: '700', fontSize: 13 },
});
