import React from 'react';
import {SafeAreaView, Text} from 'react-native-safe-area-context';
const ReminderScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>ReminderScreen</Text>
    </SafeAreaView>
  );
};

export default ReminderScreen;
