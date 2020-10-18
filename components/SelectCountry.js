import React from 'react'
import { FlatList, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function SelectCountry ({ navigation, route }) {
  const { data } = route.params
  let getView = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        onPress={e => {
          //   onItemClick(item)
          navigation.navigate('Home', { name: item.name })
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Image source={{ uri: item.flag }} style={{ width: 30, height: 20 }} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {data ? (
        <FlatList
          data={data}
          renderItem={getView}
          keyExtractor={item => {
            return item.name
          }}
        />
      ) : (
        <Text>Failed to load data</Text>
      )}
    </View>
  )
}

export default SelectCountry
