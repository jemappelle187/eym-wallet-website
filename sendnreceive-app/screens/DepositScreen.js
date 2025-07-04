import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DepositScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null); // e.g., 'card', 'bank', 'mobile_money'

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to deposit.');
      return;
    }
    if (!paymentMethod) {
      Alert.alert('Payment Method', 'Please select a payment method.');
      return;
    }
    // Mock deposit action
    Alert.alert('Deposit Initiated', `Successfully initiated deposit of $${amount} via ${paymentMethod}.`);
    setAmount('');
    setPaymentMethod(null);
    // navigation.goBack(); // Optionally navigate back or to transactions
  };

  // Mock payment methods
  const paymentOptions = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'bank', label: 'Bank Transfer', icon: 'business-outline' },
    { id: 'mobile_money', label: 'Mobile Money', icon: 'phone-portrait-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deposit Funds</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Enter Amount (USD)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 100"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Select Payment Method</Text>
        {paymentOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.paymentOption,
              paymentMethod === option.id && styles.selectedPaymentOption
            ]}
            onPress={() => setPaymentMethod(option.id)}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={paymentMethod === option.id ? '#fff' : '#004AAD'}
              style={styles.paymentIcon}
            />
            <Text
              style={[
                styles.paymentOptionText,
                paymentMethod === option.id && styles.selectedPaymentOptionText
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
          <Text style={styles.depositButtonText}>Confirm Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    backgroundColor: '#004AAD',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  selectedPaymentOption: {
    backgroundColor: '#004AAD',
    borderColor: '#004AAD',
  },
  paymentIcon: {
    marginRight: 10,
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#004AAD',
  },
  selectedPaymentOptionText: {
    color: '#fff',
  },
  depositButton: {
    backgroundColor: '#00C853', // A success green
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  depositButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DepositScreen;
