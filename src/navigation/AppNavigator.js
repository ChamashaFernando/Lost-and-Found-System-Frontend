import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import PostItemScreen from '../screens/PostItemScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import MyHistoryScreen from '../screens/MyHistoryScreen';
import CreateClaimScreen from '../screens/CreateClaimScreen';
import ClaimListScreen from '../screens/ClaimListScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import StudentItemDetails from '../screens/StudentItemDetails';
import MyReportsScreen from '../screens/MyReportsScreen';
import ReportFoundScreen from '../screens/ReportFoundScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostItem" component={PostItemScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="MyHistory" component={MyHistoryScreen} />
        <Stack.Screen name="CreateClaim" component={CreateClaimScreen} />
        <Stack.Screen name="ClaimList" component={ClaimListScreen} />
        <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
        <Stack.Screen name="StudentItemDetails" component={StudentItemDetails} />
        <Stack.Screen name="MyReports" component={MyReportsScreen} />
        <Stack.Screen name="ReportFound" component={ReportFoundScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
