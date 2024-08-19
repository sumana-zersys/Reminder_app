// SpecialScreen.js
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const SpecialScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Special Screen</Text>
    </SafeAreaView>
  );
};

export default SpecialScreen;
