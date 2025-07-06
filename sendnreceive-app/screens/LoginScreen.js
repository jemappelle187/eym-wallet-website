import React, { useState, useContext } from 'react'; // Added useContext
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'; // Added ActivityIndicator, Alert
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    if (!email.trim() || !password.trim()) { // Added trim() for basic validation
        Alert.alert("Validation Error", "Please enter both email and password.");
        return;
    }
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="paper-plane-outline" size={60} color={Colors.primary} style={styles.logoPlaceholder} />
      <Text style={styles.appName}>SendNReceive</Text>
      <Text style={styles.tagline}>Africa to World, World to Africa – Zero Fees</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color={Colors.textMuted} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={Colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color={Colors.textMuted} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLoginPress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.cardBackground} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={isLoading}>
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
    backgroundColor: Colors.background,
  },
  logoPlaceholder: {
    marginBottom: 10,
  },
  appName: {
    ...Typography.header,
    color: Colors.primary,
    fontSize: 32,
    marginBottom: 8,
  },
  tagline: {
    ...Typography.bodyText,
    color: Colors.textMuted,
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14, // Adjusted for better fit
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Lighter border
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    ...Typography.bodyText,
    flex: 1,
    height: 55,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.primary,
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
  buttonDisabled: {
    backgroundColor: Colors.textMuted,
  },
  buttonText: {
    ...Typography.buttonText,
  },
  linkText: {
    ...Typography.bodyText,
    color: Colors.primary,
    fontSize: 15, // Adjusted
  },
  linkTextBold: {
    fontWeight: 'bold',
  }
});

export default LoginScreen;
