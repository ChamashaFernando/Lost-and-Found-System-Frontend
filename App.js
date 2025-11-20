

// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { LanguageProvider } from './src/context/LanguageContext';

// export default function App() {
//   return (
//     <LanguageProvider>
//       <AppNavigator />
//     </LanguageProvider>
//   );
// }


import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import messaging from '@react-native-firebase/messaging';
import useFcmListeners from './src/hooks/useFcmListeners';

export default function App() {
  useFcmListeners();

  useEffect(() => {
    // Token print
    messaging()
      .getToken()
      .then(token => {
        console.log('🔥 FCM TOKEN:', token);
      })
      .catch(err => console.log('FCM token error:', err));
  }, []);

  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}
