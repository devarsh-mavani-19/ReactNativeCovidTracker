import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SelectCountry from './components/SelectCountry'
import Home from './components/Home'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='CountrySelector' component={SelectCountry} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
