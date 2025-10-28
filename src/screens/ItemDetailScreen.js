



import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user, token } = route.params;

  const handleClaim = () => {
    navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
  };

  const handleViewAllClaims = () => {
    // ✅ Pass itemId and token to ClaimList
    navigation.navigate('ClaimList', { itemId: item.id, token });
  };

  return (
    <View style={styles.container}>
      {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
        style={styles.image} 
      />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Category: {item.category}</Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>

      <TouchableOpacity style={styles.button} onPress={handleClaim}>
        <Text style={styles.buttonText}>Claim This Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewAllClaims}>
        <Text style={styles.buttonText}>View All Claims</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eaeded' },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5, color: '#333' },
  emergency: { color: 'red', fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  viewButton: {
    backgroundColor: '#3578c6', // darker shade
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});




// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

// export default function ItemDetailScreen({ route, navigation }) {
//   const { item, user, token } = route.params;

//   const handleClaim = () => {
//     navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
//   };

//   const handleViewAllClaims = () => {
//     navigation.navigate('ClaimList', { itemId: item.id, token });
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
//       {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
//       <Image 
//         source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
//         style={styles.image} 
//       />

//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.text}>Description: {item.description || 'N/A'}</Text>
//       <Text style={styles.text}>Category: {item.category}</Text>
//       <Text style={styles.text}>Location: {item.location}</Text>
//       <Text style={styles.text}>Status: {item.status}</Text>
//       <Text style={styles.text}>Phone: {item.phoneNumber || 'N/A'}</Text>
//       <Text style={styles.text}>
//         Posted on: {item.date ? new Date(item.date).toLocaleString() : 'N/A'}
//       </Text>
//       <Text style={styles.text}>
//         Posted by: {item.user ? item.user.fullName : 'Unknown'} ({item.user?.email || '-'})
//       </Text>

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
//   container: { flex: 1, backgroundColor: '#eaeded', padding: 20 },
//   image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   text: { fontSize: 16, marginBottom: 5, color: '#333' },
//   emergency: { color: 'red', fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
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
