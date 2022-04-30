import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen, DetailScreen, HomeScreen, SearchScreen} from '../screens';
import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Your favorite movies'}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{title: 'Search movies'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{headerTransparent: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
