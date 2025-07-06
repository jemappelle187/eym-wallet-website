import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform, SafeAreaView, ActivityIndicator } from 'react-native'; // Added SafeAreaView, ActivityIndicator
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
// Assuming TransactionContext might be used to add a transaction after sending
// import { TransactionContext } from '../contexts/TransactionContext';

const MOCK_CONVERSION_RATE_USD_TO_KES = 130.50; // Example rate

const SendMoneyScreen = ({ navigation }) => {
  // const { addTransaction } = useContext(TransactionContext); // If adding transaction to context
  const [recipient, setRecipient] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [amountKES, setAmountKES] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For send button

  useEffect(() => {
    if (amountUSD && !isNaN(parseFloat(amountUSD))) {
      const converted = parseFloat(amountUSD) * MOCK_CONVERSION_RATE_USD_TO_KES;
      setAmountKES(converted.toFixed(2));
    } else {
      setAmountKES('');
    }
  }, [amountUSD]);

  const handleSendMoney = async () => {
    if (!recipient.trim()) {
      Alert.alert('Recipient Required', 'Please enter recipient details.');
      return;
    }
    if (!amountUSD || parseFloat(amountUSD) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to send.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    Alert.alert(
      'Send Money (Mock)',
      `Successfully sent $${amountUSD} (KES ${amountKES}) to ${recipient}. Note: ${note || 'N/A'}`
    );
    setIsLoading(false);
    setRecipient('');
    setAmountUSD('');
    setNote('');
    // Consider navigation.goBack() or to a success/transaction detail screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={isLoading}>
          <Ionicons name="arrow-back-outline" size={28} color={Colors.cardBackground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={{width:28}}/> {/* Spacer for centering title */}
      </View>

      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Recipient (Email, Phone, or Username)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., user@example.com"
          placeholderTextColor={Colors.textMuted}
          value={recipient}
          onChangeText={setRecipient}
          editable={!isLoading}
        />

        <Text style={styles.label}>Amount to Send (USD)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 50"
          placeholderTextColor={Colors.textMuted}
          keyboardType="numeric"
          value={amountUSD}
          onChangeText={setAmountUSD}
          editable={!isLoading}
        />

        {amountKES ? (
          <View style={styles.conversionBox}>
            <Text style={styles.conversionText}>
              Recipient will receive approx:
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
          placeholderTextColor={Colors.textMuted}
          value={note}
          onChangeText={setNote}
          multiline
          editable={!isLoading}
        />

        <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.buttonDisabled]}
            onPress={handleSendMoney}
            disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.cardBackground} />
          ) : (
            <Text style={styles.sendButtonText}>Confirm & Send</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...Typography.subHeader,
    color: Colors.cardBackground,
    fontSize: 20,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    ...Typography.bodyText,
    color: Colors.textMuted,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    ...Typography.bodyText,
    width: '100%',
    height: 50,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  conversionBox: {
    backgroundColor: Colors.promotionBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  conversionText: {
    ...Typography.bodyText,
    color: Colors.primary,
    fontSize: 15,
  },
  conversionAmount: {
    fontWeight: 'bold',
  },
  conversionRateText: {
    ...Typography.smallText,
    marginTop: 5,
  },
  sendButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: Colors.textMuted,
  },
  sendButtonText: {
    ...Typography.buttonText,
    color: Colors.cardBackground,
  },
});

export default SendMoneyScreen;
