import 'react-native-gesture-handler';
import * as React from 'react';
import {enableFreeze} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// This will help reduce lag when a lot of screens have been loaded by avoiding re-rendering screens that are not being used
enableFreeze(true);
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
