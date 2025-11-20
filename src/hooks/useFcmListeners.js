import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { useEffect } from 'react';

async function displayNotification(remoteMessage) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  });
}

export default function useFcmListeners() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('💬 Foreground message:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('💤 Background message:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);
}
