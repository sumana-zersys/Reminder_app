/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from '../../../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {authentication} from '../../../../context/config';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {login} = useAuth();
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(authentication, email, password)
      .then(res => {
        console.log(res.user);
        login();
        navigation.navigate('DashboardScreen');
      })
      .catch(error => {
        Alert.alert('Sign Up Error', error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp for your Reminders</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#93C572',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignUpScreen;
