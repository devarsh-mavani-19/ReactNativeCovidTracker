import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function InfoBox ({ title, cases, total }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'red',
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 5
        }}
      >
        {title}
      </Text>
      <Text style={{ color: 'black', fontStyle: 'italic', marginLeft: 5 }}>
        {cases}
      </Text>
      <Text style={{ color: 'black', fontStyle: 'italic', marginLeft: 5 }}>
        {total}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'lightgray',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export default InfoBox
