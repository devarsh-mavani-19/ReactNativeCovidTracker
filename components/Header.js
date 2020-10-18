import Constants from 'expo-constants'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

function Header ({ onButtonClick, country }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Covid-19 Tracker</Text>
      <Button style={styles.button} title={country} onPress={onButtonClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
  },
  heading: {
    fontSize: 25,
    color: '#5b5661'
  },
  button: {}
})

export default Header
