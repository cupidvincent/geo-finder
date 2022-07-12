/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GeoInfo = ({info}) => {
  return (
    <View style={{margin: 20}}>
      <Text>ip: {info && info.ip ? info.ip : 'n/a'}</Text>
      <Text>hostname: {info && info.hostname ? info.hostname : 'n/a'}</Text>
      <Text>city: {info && info.city ? info.city : 'n/a'}</Text>
      <Text>region: {info && info.region ? info.region : 'n/a'}</Text>
      <Text>country: {info && info.country ? info.country : 'n/a'}</Text>
      <Text>loc: {info && info.loc ? info.loc : 'n/a'}</Text>
      <Text>org: {info && info.org ? info.org : 'n/a'}</Text>
      <Text>postal: {info && info.postal ? info.postal : 'n/a'}</Text>
      <Text>timezone: {info && info.timezone ? info.timezone : 'n/a'}</Text>
      <Text>readme: {info && info.readme ? info.readme : 'n/a'}</Text>
    </View>
  )
}

export default GeoInfo

const styles = StyleSheet.create({})