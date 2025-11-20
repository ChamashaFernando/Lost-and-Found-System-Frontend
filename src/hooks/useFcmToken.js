import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

export default function useFcmToken(userId, token) {
  useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);

      // 🔹 Send token to backend
      if (fcmToken) {
        await axios.post(`http://172.20.10.3:8096/api/users/${userId}/token`, {
          fcmToken
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }
    getToken();

    // Listen for token refresh
    const unsubscribe = messaging().onTokenRefresh(newToken => {
      console.log('FCM Token refreshed:', newToken);
      axios.post(`http://172.20.10.3:8096/api/users/${userId}/token`, {
        fcmToken: newToken
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    });

    return unsubscribe;
  }, [userId, token]);
}
