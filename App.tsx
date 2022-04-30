import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppProvider from './src/AppProvider';

import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar />
        <RootNavigation />
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
