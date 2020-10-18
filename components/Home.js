import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Header from './Header'
import { countriesUrl } from '../utils/urls'
import axios from 'axios'
import InfoBox from './InfoBox'
import MapView, { Marker, Callout } from 'react-native-maps'

function Home ({ navigation, route }) {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [mapCountries, setMapCountries] = useState([])

  //load countries list
  useEffect(() => {
    axios
      .get(countriesUrl)
      .then(data => {
        let countryData = []
        countryData.push({
          flag: `https://img.icons8.com/doodle/2x/green-earth.png`,
          name: 'worldwide'
        })
        data.data.forEach(country => {
          countryData.push({
            flag: country.countryInfo.flag,
            name: country.country
          })
        })
        setMapCountries(data.data)
        setCountries(countryData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  //load card details
  useEffect(() => {
    let selected = route.params
    selected = selected ? selected : { name: 'worldwide' }
    let url
    if (selected.name == 'worldwide') {
      url = `https://disease.sh/v3/covid-19/all`
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${selected.name}`
    }
    axios
      .get(url)
      .then(data => {
        setCountryInfo(data.data)
        setCountry(selected.name)
      })
      .catch(error => {
        console.log(error)
      })
  }, [route])

  let onCountrySelected = ({ item }) => {
    const selectedCountry = item.name
    let url
    if (selectedCountry == 'worldwide') {
      url = `https://disease.sh/v3/covid-19/all`
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${selectedCountry}`
    }
    axios
      .get(url)
      .then(data => {
        setCountryInfo(data.data)
        setCountry(selectedCountry)
      })
      .catch(error => {
        console.log(error)
      })
  }

  let openCountrySelector = () => {
    navigation.navigate('CountrySelector', {
      data: countries
    })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header onButtonClick={openCountrySelector} country={country} />
        <View style={styles.stats}>
          <InfoBox
            title={'Cases'}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title={'Recovered'}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title={'Deaths'}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </View>
        <MapView
          key={Date.now()}
          initialRegion={{
            latitude: countryInfo.countryInfo
              ? countryInfo.countryInfo.lat
              : 33,
            longitude: countryInfo.countryInfo
              ? countryInfo.countryInfo.long
              : 65,
            latitudeDelta: 20,
            longitudeDelta: 20
          }}
          style={{ width: '100%', height: 300 }}
        >
          {mapCountries.map(mCountry => (
            <Marker
              key={mCountry.country}
              coordinate={{
                latitude: mCountry.countryInfo.lat,
                longitude: mCountry.countryInfo.long
              }}
              title={`${mCountry.countryInfo.lat}`}
              description={`${mCountry.countryInfo.long}`}
            >
              <Callout>
                <Text>{mCountry.country}</Text>
                <Text>{mCountry.cases}</Text>
                <Text>{mCountry.recovered}</Text>
                <Text>{mCountry.deaths}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stats: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 30
  }
})

export default Home
