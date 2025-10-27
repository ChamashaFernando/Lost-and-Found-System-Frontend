import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getReportsByUser } from '../api/api';

const MyReportsScreen = ({ route }) => {
  const { userId, token } = route.params;
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReportsByUser(userId, token);
      setReports(data);
    } catch (error) {
      console.error('Fetch Reports Error:', error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Failed to fetch reports");
      } else if (error.request) {
        Alert.alert("Error", "No response from server. Check server/network.");
      } else {
        Alert.alert("Error", "Axios error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const renderItem = ({ item }) => (
    <View style={styles.reportCard}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.date}>Reported at: {new Date(item.reportedAt).toLocaleString()}</Text>
      {item.photoUrl && <Image source={{ uri: item.photoUrl }} style={styles.photo} />}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      {reports.length === 0 ? (
        <Text style={styles.noReportsText}>No reports found</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default MyReportsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  reportCard: { padding: 15, marginVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 10 },
  category: { fontWeight: 'bold', fontSize: 16 },
  description: { marginTop: 5 },
  location: { marginTop: 5, fontStyle: 'italic' },
  date: { marginTop: 5, fontSize: 12, color: '#555' },
  photo: { marginTop: 10, width: '100%', height: 200, borderRadius: 10 },
  noReportsText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
