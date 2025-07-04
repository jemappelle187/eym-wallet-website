import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock conversion rate
const MOCK_CONVERSION_RATE_USD_TO_KES = 130.50;

const SendMoneyScreen = ({ navigation }) => {
  const [recipient, setRecipient] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [amountKES, setAmountKES] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (amountUSD && !isNaN(parseFloat(amountUSD))) {
      const converted = parseFloat(amountUSD) * MOCK_CONVERSION_RATE_USD_TO_KES;
      setAmountKES(converted.toFixed(2));
    } else {
      setAmountKES('');
    }
  }, [amountUSD]);

  const handleSendMoney = () => {
    if (!recipient) {
      Alert.alert('Recipient Required', 'Please enter recipient details.');
      return;
    }
    if (!amountUSD || parseFloat(amountUSD) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to send.');
      return;
    }
    // Mock send money action
    Alert.alert(
      'Send Money',
      `Successfully sent $${amountUSD} (KES ${amountKES}) to ${recipient}. Note: ${note || 'N/A'}`
    );
    setRecipient('');
    setAmountUSD('');
    setNote('');
    // navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Recipient (Email, Phone, or Username)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., user@example.com or +2547XXXXXXXX"
          value={recipient}
          onChangeText={setRecipient}
        />

        <Text style={styles.label}>Amount to Send (USD)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 50"
          keyboardType="numeric"
          value={amountUSD}
          onChangeText={setAmountUSD}
        />

        {amountKES ? (
          <View style={styles.conversionBox}>
            <Text style={styles.conversionText}>
              Recipient will receive approximately:
              <Text style={styles.conversionAmount}> KES {amountKES}</Text>
            </Text>
            <Text style={styles.conversionRateText}>
              (Mock rate: 1 USD = {MOCK_CONVERSION_RATE_USD_TO_KES} KES)
            </Text>
          </View>
        ) : null}

        <Text style={styles.label}>Note (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., For school fees"
          value={note}
          onChangeText={setNote}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
          <Text style={styles.sendButtonText}>Send Money</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 10, // Reduced margin for tighter layout
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android
    paddingTop: 15, // For iOS
  },
  conversionBox: {
    backgroundColor: '#e6f0ff', // Light blue background
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#b3d1ff', // Lighter blue border
  },
  conversionText: {
    fontSize: 16,
    color: '#004AAD', // Primary brand color
  },
  conversionAmount: {
    fontWeight: 'bold',
  },
  conversionRateText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  sendButton: {
    backgroundColor: '#004AAD', // Primary brand color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendMoneyScreen;
