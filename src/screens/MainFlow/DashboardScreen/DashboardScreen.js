import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';

import {useAuth} from '../../../../context/AuthContext';

const ReminderScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {logout} = useAuth();

  useEffect(() => {
    loadReminders();
  }, []);

  const addReminder = async () => {
    if (newReminder.trim()) {
      const updatedReminders = [
        ...reminders,
        {text: newReminder, dateTime: date.toString()},
      ];
      setReminders(updatedReminders);
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setNewReminder('');
      setDate(new Date());
    }
  };

  const deleteReminder = async index => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setShowTimePicker(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Regular Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.reminderItemContainer}>
            <Text style={styles.reminderItem}>
              {item.text} {'\n'}
              <Text style={styles.reminderDateTime}>{item.dateTime}</Text>
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteReminder(index)}>
              <MaterialCommunityIcons name="delete" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        )}
        style={styles.reminderList}
      />
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={newReminder}
            onChangeText={setNewReminder}
            placeholder="Add new reminder"
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <MaterialCommunityIcons name="calendar" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <LinearGradient
            colors={['#43C6AC', '#F8FFAE']}
            style={styles.gradientButton}>
            <Text style={styles.addButtonText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <LinearGradient
          colors={['#FF6F61', '#DE6262']}
          style={styles.gradientButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const SpecialScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {logout} = useAuth();

  useEffect(() => {
    loadReminders();
  }, []);

  const addReminder = async () => {
    if (newReminder.trim()) {
      const updatedReminders = [
        ...reminders,
        {text: newReminder, dateTime: date.toString()},
      ];
      setReminders(updatedReminders);
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setNewReminder('');
      setDate(new Date());
    }
  };

  const deleteReminder = async index => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setShowTimePicker(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Special Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.reminderItemContainer}>
            <Text style={styles.reminderItem}>
              {item.text} {'\n'}
              <Text style={styles.reminderDateTime}>{item.dateTime}</Text>
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteReminder(index)}>
              <MaterialCommunityIcons name="delete" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        )}
        style={styles.reminderList}
      />
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={newReminder}
            onChangeText={setNewReminder}
            placeholder="Add new reminder"
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <MaterialCommunityIcons name="calendar" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <LinearGradient
            colors={['#43C6AC', '#F8FFAE']}
            style={styles.gradientButton}>
            <Text style={styles.addButtonText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <LinearGradient
          colors={['#FF6F61', '#DE6262']}
          style={styles.gradientButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Tab = createMaterialBottomTabNavigator();

const DashboardScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="ReminderScreen"
      activeColor="#e91e63"
      inactiveColor="#355E3B"
      barStyle={{backgroundColor: '#C1E1C1'}}>
      <Tab.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{
          tabBarLabel: 'Regular',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SpecialScreen"
        component={SpecialScreen}
        options={{
          tabBarLabel: 'Special',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  reminderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
  },
  reminderItem: {
    fontSize: 16,
    color: '#333',
  },
  reminderDateTime: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#355E3B',
  },
  addButton: {
    marginLeft: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reminderList: {
    marginBottom: 16,
  },
});

export default DashboardScreen;
