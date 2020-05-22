import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from './src/screens/Map.js'
import HomeScreen from './src/screens/Home.js'
import TrekScreen from './src/screens/Trek.js'
import TrekRouteScreen from './src/screens/TrekRoute.js'


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Trek" component={TrekScreen} />
        <Stack.Screen name="TrekRoute" component={TrekRouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
