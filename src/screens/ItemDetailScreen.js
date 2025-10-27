


// import React from 'react';
// import { View, Text, Button, Image, StyleSheet } from 'react-native';

// export default function ItemDetailScreen({ route, navigation }) {
//   const { item, user, token } = route.params;

//   return (
//     <View style={styles.container}>
//       {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
//       <Image 
//         source={item.imageUrl ? { uri: `http://172.20.10.3:8096${item.imageUrl}` } : require('../assets/no-image.png')} 
//         style={styles.image} 
//       />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text>Category: {item.category}</Text>
//       <Text>Location: {item.location}</Text>
//       <Text>Status: {item.status}</Text>

//       <Button
//         title="Claim This Item"
//         onPress={() => navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token })}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 10 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
//   emergency: { color: 'red', fontWeight: 'bold', marginBottom: 5 },
// });




import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user, token } = route.params;

  return (
    <View style={styles.container}>
      {item.emergency && <Text style={styles.emergency}>⚠️ Emergency</Text>}
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/no-image.png')} 
        style={styles.image} 
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Status: {item.status}</Text>

      <Button
        title="Claim This Item"
        onPress={() => navigation.navigate('CreateClaim', { itemId: item.id, userId: user.id, token })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  emergency: { color: 'red', fontWeight: 'bold', marginBottom: 5 },
});
