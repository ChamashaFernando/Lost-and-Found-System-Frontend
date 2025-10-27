// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Save user object locally
// export const saveUser = async user => {
//   await AsyncStorage.setItem('user', JSON.stringify(user));
// };

// // Get saved user
// export const getUser = async () => {
//   const user = await AsyncStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// // Clear saved user (logout)
// export const clearUser = async () => {
//   await AsyncStorage.removeItem('user');
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user:', e);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Failed to load user:', e);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error('Failed to clear user:', e);
  }
};
