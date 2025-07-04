import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'; // Added Image
import { Ionicons } from '@expo/vector-icons';

// (handleLoginPress function remains the same)
const handleLoginPress = (email, password, onLoginSuccess) => {
  console.log('Login attempt with:', email, password);
  if (onLoginSuccess) {
    onLoginSuccess();
  } else {
    alert('Login Successful (mock)!');
  }
};


const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Replace with actual logo if available */}
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
      <Ionicons name="paper-plane-outline" size={60} color="#004AAD" style={styles.logoPlaceholder} />
      <Text style={styles.appName}>SendNReceive</Text>
      <Text style={styles.tagline}>Africa to World, World to Africa – Zero Fees</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLoginPress(email, password, onLoginSuccess)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#f0f4f7',
  },
  logoPlaceholder: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#004AAD', // Primary brand color
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55, // Increased height
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 55, // Increased height
    backgroundColor: '#004AAD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#004AAD',
    fontSize: 16,
  },
  linkTextBold: {
    fontWeight: 'bold',
  }
});

export default LoginScreen;
