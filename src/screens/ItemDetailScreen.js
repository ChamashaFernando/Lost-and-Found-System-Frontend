





// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native';

// export default function ItemDetailScreen({ route, navigation }) {
//   const { item, user, token } = route.params;

//   const handleClaim = () => {
//     navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
//   };

//   const handleViewAllClaims = () => {
//     navigation.navigate('ClaimList', { itemId: item.id, token });
//   };

//   const handleCall = (phoneNumber) => {
//     if (phoneNumber) Linking.openURL(`tel:${phoneNumber}`);
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
//       {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
//       <Image 
//         source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
//         style={styles.image} 
//       />

//       <Text style={styles.title}>{item.title}</Text>

//       <View style={styles.section}>
//         <Text style={styles.label}>Description: </Text>
//         <Text style={styles.text}>{item.description || 'N/A'}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Category: </Text>
//         <Text style={styles.text}>{item.category || 'N/A'}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Location: </Text>
//         <Text style={styles.text}>{item.location || 'N/A'}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Status: </Text>
//         <Text style={[styles.text, { color: item.status === 'LOST' ? '#d9534f' : '#5cb85c', fontWeight: 'bold' }]}>
//           {item.status || 'N/A'}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Phone Number: </Text>
//         <Text style={[styles.text, { color: '#4a90e2' }]} onPress={() => handleCall(item.phoneNumber)}>
//           {item.phoneNumber || 'N/A'}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Posted On: </Text>
//         <Text style={styles.text}>{item.date ? new Date(item.date).toLocaleString() : 'N/A'}</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleClaim}>
//         <Text style={styles.buttonText}>Claim This Item</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewAllClaims}>
//         <Text style={styles.buttonText}>View All Claims</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
//   image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 20 },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#333' },
//   section: { marginBottom: 12 },
//   text: { fontSize: 16, color: '#555', marginTop: 2 },
//   label: { fontWeight: '600', fontSize: 16, color: '#4a90e2' },
//   emergency: { color: 'red', fontWeight: 'bold', marginBottom: 15, fontSize: 18, textAlign: 'center' },
//   button: {
//     backgroundColor: '#4a90e2',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20
//   },
//   viewButton: { backgroundColor: '#3578c6' },
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
// });





import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user, token } = route.params;

  const handleClaim = () => {
    navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
  };

  const handleViewAllClaims = () => {
    navigation.navigate('ClaimList', { itemId: item.id, token });
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderRow = (label, value, isPhone = false, isStatus = false) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label} </Text>
      <Text 
        style={[
          styles.value, 
          isPhone && { color: '#4a90e2' }, 
          isStatus && { color: value === 'LOST' ? '#d9534f' : '#5cb85c', fontWeight: 'bold' }
        ]}
        onPress={isPhone ? () => handleCall(value) : null}
      >
        {value || 'N/A'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
        style={styles.image} 
      />

      <Text style={styles.title}>{item.title}</Text>

      {renderRow('Description:', item.description)}
      {renderRow('Category:', item.category)}
      {renderRow('Location:', item.location)}
      {renderRow('Status:', item.status, false, true)}
      {renderRow('Phone Number:', item.phoneNumber, true)}
      {renderRow('Posted On:', item.date ? new Date(item.date).toLocaleString() : 'N/A')}
      {renderRow('Posted By:', item.user ? `${item.user.fullName} (${item.user.email || '-'})` : 'Unknown')}

      <TouchableOpacity style={styles.button} onPress={handleClaim}>
        <Text style={styles.buttonText}>Claim This Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewAllClaims}>
        <Text style={styles.buttonText}>View All Claims</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' },
  label: { fontWeight: '600', fontSize: 16, color: '#4a90e2' },
  value: { fontSize: 16, color: '#555' },
  emergency: { color: 'red', fontWeight: 'bold', marginBottom: 15, fontSize: 18, textAlign: 'center' },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  viewButton: { backgroundColor: '#3578c6' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
