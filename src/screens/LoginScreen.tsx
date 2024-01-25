/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../config';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);


  const checkLoginStatus = async ()=> {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('OfficerList');
      }
    } catch (error) {
      console.error('Error checking login status:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true when login request starts

      const response = await axios.post(`${baseUrl}/auth/login`, {
        username: username,
        password1: password1,
        password2: password2,
      });

      const data = response.data;

      console.log('data==', data.token);

      if (response.status === 200) {
        if (data.error === false) {
          setStep(2);
          Alert.alert('Info', 'Enter the second password.');
        } else if (data.success === true) {
          Alert.alert('Success', 'Login successful.');
          AsyncStorage.setItem('token', data.token);
          navigation.navigate('OfficerList');
        }
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      // console.error('Error during login:', error.message);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when login request completes (either success or failure)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword1(text)}
          value={password1}
          secureTextEntry
        />
        {step === 2 && (
          <TextInput
            style={styles.input}
            placeholder="Second Password"
            onChangeText={text => setPassword2(text)}
            value={password2}
            secureTextEntry
          />
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0A3D62',
  },
  form: {
    backgroundColor: '#0A3D62',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
