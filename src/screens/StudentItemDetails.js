// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// export default function StudentItemDetails({ route, navigation }) {
//   const { item, user, token } = route.params;

//   const handleClaim = () => {
//     navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
//   };

//   return (
//     <View style={styles.container}>
//       {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
//       <Image 
//         source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
//         style={styles.image} 
//       />

//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.text}>Category: {item.category}</Text>
//       <Text style={styles.text}>Location: {item.location}</Text>
//       <Text style={styles.text}>Status: {item.status}</Text>

//       {/* Claim This Item Button */}
//       <TouchableOpacity style={styles.button} onPress={handleClaim}>
//         <Text style={styles.buttonText}>Claim This Item</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#eaeded' },
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
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
// });




// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// export default function StudentItemDetails({ route, navigation }) {
//   const { item, user, token } = route.params;

//   const handleClaim = () => {
//     navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
//   };

//   return (
//     <View style={styles.container}>
//       {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
//       <Image 
//         source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
//         style={styles.image} 
//       />

//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.text}>Category: {item.category}</Text>
//       <Text style={styles.text}>Location: {item.location}</Text>
//       <Text style={styles.text}>Status: {item.status}</Text>

//       <TouchableOpacity style={styles.button} onPress={handleClaim}>
//         <Text style={styles.buttonText}>Claim This Item</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#eaeded' },
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
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
// });



import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

export default function StudentItemDetails({ route, navigation }) {
  const { item, user, token } = route.params;

  const handleClaim = () => {
    navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
        style={styles.image} 
      />

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.text}><Text style={styles.label}>Description:</Text> {item.description || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Category:</Text> {item.category}</Text>
      <Text style={styles.text}><Text style={styles.label}>Location:</Text> {item.location}</Text>
      <Text style={styles.text}><Text style={styles.label}>Status:</Text> {item.status}</Text>
      <Text style={styles.text}><Text style={styles.label}>Phone Number:</Text> {item.phoneNumber || 'N/A'}</Text>
      <Text style={styles.text}><Text style={styles.label}>Posted On:</Text> {item.date ? new Date(item.date).toLocaleString() : 'N/A'}</Text>

      <TouchableOpacity style={styles.button} onPress={handleClaim}>
        <Text style={styles.buttonText}>Claim This Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eaeded' },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 8, color: '#333' },
  label: { fontWeight: 'bold', color: '#4a90e2' },
  emergency: { color: 'red', fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
