// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ListMemberScreen from './src/screens/ListMemberScreen';
import ListSheetDiemDanhScreen from './src/screens/ListSheetDiemDanhScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DiemDanhScreen from './src/screens/DiemDanhScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='auto'/>
        <Stack.Navigator
          initialRouteName='HomeScreen'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ListMemberScreen" component={ListMemberScreen} />
          <Stack.Screen name="ListSheetDiemDanhScreen" component={ListSheetDiemDanhScreen} />
          <Stack.Screen name="DiemDanhScreen" component={DiemDanhScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;