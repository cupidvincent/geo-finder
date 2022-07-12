/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Map from './components/Map';
import GeoInfo from './components/GeoInfo';
import { Searchbar } from 'react-native-paper';
import publicIP from 'react-native-public-ip';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loc, setLoc] = useState({})
  const [origloc, setOrigLoc] = useState({})
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeSearch = query =>{
    setSearchQuery(query);
    if(query === '') {revertIp()}
  }

  const getInfo = async (e) => {
    let response = await fetch(
      `https://ipinfo.io/${searchQuery}/geo`
    );
    
    const json = await response.json();
    setLoc(json)
  }

  const revertIp = async () => {
    let response = await fetch(
      `https://ipinfo.io/${origloc.ip}/geo`
    );
    
    const json = await response.json();
    setLoc(json)
  }

  const fetchMap = async () => {
    const pubip = await publicIP()
    .then(ip => {
      // '47.122.71.234'
      return ip
    })
    
    let response = await fetch(
     `https://ipinfo.io/${pubip}/geo`
    );
    
    const json = await response.json();
    setLoc(json)
    setOrigLoc(json)
  }

  useEffect(() => {
    fetchMap()
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}

      <View style={{ backgroundColor: "skyblue", textAlign: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 50, color: 'white' }} > Geo Finder</Text>
      </View>

      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={getInfo}
        />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <GeoInfo info={loc}/>
        </View>
        <View          
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Map coord={loc.loc} alldata={loc}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
