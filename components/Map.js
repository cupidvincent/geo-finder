/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import MapView, { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';

const Map = ({coord,alldata}) => {

  const [newCoord, setNewCoord] = useState(['0','0'])
  const [maprec, setMaprec] = useState({})
  useEffect(() => {
    if (coord) {
      setNewCoord([...coord.split(",")])
    }
    setMaprec(alldata)
  }, [coord,maprec])

  return (
    <View style={styles.container}>
       <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: parseFloat(newCoord[0]),
          longitude: parseFloat(newCoord[1]),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        initialRegion={{
          latitude: parseFloat(newCoord[0]),
          longitude: parseFloat(newCoord[1]),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
         <Marker coordinate = {{ 
          latitude: parseFloat(newCoord[0]),
          longitude: parseFloat(newCoord[1]),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
         pinColor = {"red"} // any color
         title={maprec && maprec.city ? maprec.city : '0'}
         description={maprec && maprec.region ? maprec.region : '0'}
         />
      </MapView>
      <Text>
        IP Map:
      </Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    margin: 20
  },
  map: {
    // ...StyleSheet.absoluteFillObject,  
    height: 300,
    width: '100%',
    bottom: 0
  },
})