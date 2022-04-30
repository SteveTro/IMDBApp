import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import LOGO from '../assets/images/IMDB_Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../utils/Constants';
import {AppContext} from '../AppProvider';
import {SplashScreenNavigationProp} from '../types';

const SplashScreen = ({navigation}: SplashScreenNavigationProp) => {
  const {loadItems} = useContext(AppContext);
  useEffect(() => {
    const getAsyncData = async () => {
      let data = await AsyncStorage.getItem(Constants.storage);
      if (data) {
        loadItems(JSON.parse(data));
      }
      navigation.replace('Home');
    };
    getAsyncData();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={LOGO} style={styles.image} />
      <Text style={styles.text}>IMDB APP</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 22,
  },
  image: {
    width: '50%',
    height: 100,
  },
});
