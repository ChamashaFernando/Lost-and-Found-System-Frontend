import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

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

  const handleCall = (phone) => {
    if (!phone) return Alert.alert('No phone number', 'This notification has no phone number.');
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => supported && Linking.openURL(url))
      .catch(() => Alert.alert('Error', 'Failed to open dialer.'));
  };

  const handleCopy = (text) => Alert.alert('Info', text);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🔔 {notification.title}</Text>

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
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{notification.category}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{notification.phone}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Reported:</Text>
              <Text style={styles.value}>{new Date(notification.reportedAt).toLocaleString()}</Text>
            </View>

            {notification.description && (
              <View style={{ marginTop: 4 }}>
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
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f9ff', minHeight: '100%' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#1b3358' },
  row: { flexDirection: 'row', marginTop: 2, alignItems: 'center' }, // spacing reduced
  label: { width: 85, fontSize: 13, color: '#666', fontWeight: '600' },
  value: { fontSize: 13, color: '#222', flex: 1 },
  lost: { color: '#d32f2f', fontWeight: 'bold' },
  found: { color: '#2e7d32', fontWeight: 'bold' },
  descTitle: { fontSize: 13, color: '#333', fontWeight: '700', marginBottom: 2 },
  descriptionText: { fontSize: 13, color: '#444', lineHeight: 18 },
  moreButton: { marginTop: 4 },
  moreText: { color: '#3578c6', fontWeight: '700', fontSize: 13 },
  actions: { flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }, // spacing reduced
  actionButton: {
    flex: 1,
    paddingVertical: 8, // smaller padding
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  callButton: { backgroundColor: '#3578c6' },
  copyButton: { backgroundColor: '#e0e7ef' },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  copyText: { color: '#1b3358', fontWeight: '700', fontSize: 13 },
});
