import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// (handleSignUp function remains the same)
const handleSignUp = (name, email, password, navigation) => {
  console.log('SignUp attempt with:', name, email, password);
  alert('Sign Up Successful (mock)! Please Login.');
  navigation.navigate('Login');
};

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Ionicons name="person-add-outline" size={50} color="#004AAD" style={styles.logoPlaceholder} />
      <Text style={styles.appName}>Join SendNReceive</Text>
      <Text style={styles.tagline}>Fast, Secure, and Zero Fee Transactions</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>
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

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp(name, email, password, navigation)}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

// Using similar styles to LoginScreen for consistency
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#f0f4f7',
  },
  logoPlaceholder: { // Slightly different icon for variety
    marginBottom: 10,
  },
  appName: { // Slightly different title for context
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004AAD',
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
    height: 55,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#00C853', // Accent green for sign up
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

export default SignUpScreen;
