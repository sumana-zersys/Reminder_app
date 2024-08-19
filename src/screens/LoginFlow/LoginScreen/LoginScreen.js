/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {authentication} from '../../../../context/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from '../../../../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  const passwordRef = useRef();

  const {login} = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        authentication,
        email,
        password,
      );
      console.log('Login successful', res.user);
      login();
      navigation.navigate('DashboardScreen');
    } catch (err) {
      console.log(err);
      setError('Incorrect Email/Password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
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

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.downText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    backgroundColor: '#93C572',
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: '78%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  downText: {
    color: '#097969',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  signup: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    color: '#023020',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
    marginTop: 10,
  },
});

export default LoginScreen;
