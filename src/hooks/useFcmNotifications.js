
// // import { useEffect } from 'react';
// // import messaging from '@react-native-firebase/messaging';
// // import notifee, { AndroidImportance } from '@notifee/react-native';
// // import { Alert, Platform } from 'react-native';

// // export default function useFcmNotifications() {

// //   useEffect(() => {
// //     // 🔹 Request permissions (iOS)
// //     async function requestPermission() {
// //       const authStatus = await messaging().requestPermission();
// //       const enabled =
// //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// //       if (!enabled && Platform.OS === 'ios') {
// //         Alert.alert('Permission required', 'Please enable notifications in settings');
// //       }
// //     }

// //     requestPermission();

// //     // 🔹 Get FCM token
// //     messaging()
// //       .getToken()
// //       .then(token => {
// //         console.log('✅ FCM Token:', token);
// //         // TODO: Save this token to backend via API
// //       });

// //     // 🔹 Foreground message listener
// //     const unsubscribe = messaging().onMessage(async remoteMessage => {
// //       console.log('📩 Foreground notification:', remoteMessage);

// //       // Show local notification
// //       await notifee.displayNotification({
// //         title: remoteMessage.notification?.title || 'Notification',
// //         body: remoteMessage.notification?.body || '',
// //         android: {
// //           channelId: 'default',
// //           smallIcon: 'ic_launcher', // Android app icon
// //           importance: AndroidImportance.HIGH,
// //         },
// //       });
// //     });

// //     return unsubscribe; // cleanup on unmount
// //   }, []);
// // }




// import { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';

// export default function useFcmNotifications() {
//   useEffect(() => {
//     // 🔹 Listen for foreground messages
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground notification:', remoteMessage);

//       await notifee.displayNotification({
//         title: remoteMessage.notification?.title || 'Notification',
//         body: remoteMessage.notification?.body || '',
//         android: {
//           channelId: 'default',
//           importance: AndroidImportance.HIGH,
//         },
//       });
//     });

//     return unsubscribe;
//   }, []);
// }


import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Alert } from 'react-native';

export default function useFcmNotifications() {

  useEffect(() => {
    // Request permission
    async function requestPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) console.log('✅ FCM Permission granted');
      else console.log('❌ FCM Permission denied');
    }

    requestPermission();

    // Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 FCM Foreground Message:', remoteMessage);

      // Display local notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          importance: AndroidImportance.HIGH,
        },
      });
    });

    return unsubscribe;
  }, []);
}
