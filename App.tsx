import {useNetInfo} from '@react-native-community/netinfo';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppProvider from './src/AppProvider';
import NoConnection from './src/components/NoConnection';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  const netInfo = useNetInfo();

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar />
        <RootNavigation />
        {!netInfo.isConnected && <NoConnection />}
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
