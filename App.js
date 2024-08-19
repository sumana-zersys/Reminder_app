import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthProvider} from './context/AuthContext';
import LoginFlow from './src/routes/LoginFlow';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginFlow"
              component={LoginFlow}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
