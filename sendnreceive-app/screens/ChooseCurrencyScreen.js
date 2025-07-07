// sendnreceive-app/screens/ChooseCurrencyScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useNavigation, useRoute } from '@react-navigation/native';

const CURRENCIES = [
  { code: 'USDC', name: 'USD Coin', icon: 'logo-usd', type: 'crypto' },
  { code: 'EURC', name: 'EUR Coin', icon: 'logo-euro', type: 'crypto' }, // Assuming a similar icon or use a generic one
  { code: 'GHS', name: 'Ghanaian Cedi', icon: 'cash-outline', type: 'fiat' },
];

// Mock exchange rates - replace with API call
const MOCK_EXCHANGE_RATES = {
  USDC: { GHS: 12.50, EURC: 0.92 },
  EURC: { GHS: 13.50, USDC: 1.08 },
  GHS: { USDC: 0.08, EURC: 0.074 },
};

const ChooseCurrencyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedRecipient } = route.params;

  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [selectedSendCurrency, setSelectedSendCurrency] = useState(CURRENCIES[0]); // Default to USDC
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState(CURRENCIES[2]); // Default to GHS for recipient

  const [isSendingCrypto, setIsSendingCrypto] = useState(true); // To toggle if user is inputting send or receive amount

  useEffect(() => {
    // Highlight USDC and EURC initially as per requirement (though selection handles this)
    // For this example, we default to USDC. User can tap to change.
  }, []);

  const handleAmountChange = (text, type) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (type === 'send') {
      setSendAmount(numericValue);
      setIsSendingCrypto(true);
      if (numericValue && selectedSendCurrency && selectedReceiveCurrency) {
        const rate = MOCK_EXCHANGE_RATES[selectedSendCurrency.code]?.[selectedReceiveCurrency.code] || 0;
        setReceiveAmount((parseFloat(numericValue) * rate).toFixed(2));
      } else {
        setReceiveAmount('');
      }
    } else { // type === 'receive'
      setReceiveAmount(numericValue);
      setIsSendingCrypto(false);
      if (numericValue && selectedSendCurrency && selectedReceiveCurrency) {
        const rate = MOCK_EXCHANGE_RATES[selectedReceiveCurrency.code]?.[selectedSendCurrency.code] || 0;
        // This is inverse calculation: receive amount / (1/rate for send->receive) = send amount
        // Or, receive amount * (rate for receive->send)
        const inverseRate = MOCK_EXCHANGE_RATES[selectedReceiveCurrency.code]?.[selectedSendCurrency.code] || 0;
         setSendAmount((parseFloat(numericValue) * inverseRate).toFixed(2));
      } else {
        setSendAmount('');
      }
    }
  };

  const handleCurrencySelection = (currency, type) => {
    if (type === 'send') {
      setSelectedSendCurrency(currency);
      // Recalculate if send amount exists
      if (sendAmount && MOCK_EXCHANGE_RATES[currency.code]?.[selectedReceiveCurrency.code]) {
        const rate = MOCK_EXCHANGE_RATES[currency.code][selectedReceiveCurrency.code];
        setReceiveAmount((parseFloat(sendAmount) * rate).toFixed(2));
      } else if (!isSendingCrypto && receiveAmount && MOCK_EXCHANGE_RATES[selectedReceiveCurrency.code]?.[currency.code]) {
        // if user was editing receive amount, and changes send currency, re-calc send amount
        const inverseRate = MOCK_EXCHANGE_RATES[selectedReceiveCurrency.code][currency.code];
        setSendAmount((parseFloat(receiveAmount) * inverseRate).toFixed(2));
      }
    } else { // type === 'receive' - typically fixed for recipient country but can be flexible
      setSelectedReceiveCurrency(currency);
      // Recalculate if receive amount exists
       if (receiveAmount && MOCK_EXCHANGE_RATES[selectedSendCurrency.code]?.[currency.code]) {
        const rate = MOCK_EXCHANGE_RATES[selectedSendCurrency.code][currency.code];
        setSendAmount((parseFloat(receiveAmount) / rate).toFixed(2)); // amount / rate
      } else if (isSendingCrypto && sendAmount && MOCK_EXCHANGE_RATES[selectedSendCurrency.code]?.[currency.code]) {
        // if user was editing send amount, and changes receive currency, re-calc receive amount
        const rate = MOCK_EXCHANGE_RATES[selectedSendCurrency.code][currency.code];
        setReceiveAmount((parseFloat(sendAmount) * rate).toFixed(2));
      }
    }
  };


  const goToReview = () => {
    if (!sendAmount || parseFloat(sendAmount) <= 0 || !receiveAmount || parseFloat(receiveAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to send.");
      return;
    }
    navigation.navigate('ReviewSendScreen', {
      selectedRecipient,
      sendAmount: parseFloat(sendAmount),
      receiveAmount: parseFloat(receiveAmount),
      sendCurrency: selectedSendCurrency,
      receiveCurrency: selectedReceiveCurrency,
      exchangeRate: MOCK_EXCHANGE_RATES[selectedSendCurrency.code]?.[selectedReceiveCurrency.code] || 0,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={Typography.h2}>Amount & Currency</Text>
          <View style={{width: 40}} /> {/* Spacer to balance header */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContentContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.recipientSummaryCard}>
            <Text style={Typography.label}>Sending to:</Text>
            <Text style={Typography.h3}>{selectedRecipient.name}</Text>
            <Text style={Typography.bodyRegular}>
              {selectedRecipient.isMobileMoney ? selectedRecipient.mobileNumber : `${selectedRecipient.bankName} (${selectedRecipient.accountNumber})`}
            </Text>
          </View>

          {/* Currency Pills - Sender */}
          <Text style={[Typography.label, styles.sectionLabel]}>You Send:</Text>
          <View style={styles.currencyPillsContainer}>
            {CURRENCIES.filter(c => c.type === 'crypto' || c.code === 'GHS').map((currency) => ( // Allow GHS to be sent too
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyPill,
                  selectedSendCurrency.code === currency.code && styles.selectedPill,
                  (currency.code === 'USDC' || currency.code === 'EURC') && styles.highlightedPill,
                ]}
                onPress={() => handleCurrencySelection(currency, 'send')}
              >
                <Ionicons
                    name={currency.icon}
                    size={18}
                    color={selectedSendCurrency.code === currency.code ? Colors.textOnPrimaryCTA : Colors.brandPurple}
                    style={{marginRight: 5}}
                />
                <Text style={[
                  styles.pillText,
                  selectedSendCurrency.code === currency.code && styles.selectedPillText,
                ]}>
                  {currency.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Amount Input - Sender */}
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              value={sendAmount}
              onChangeText={(text) => handleAmountChange(text, 'send')}
              onFocus={() => setIsSendingCrypto(true)}
            />
            <Text style={styles.currencyLabelInInput}>{selectedSendCurrency.code}</Text>
          </View>

          {/* Exchange Rate Info (Optional) */}
          { selectedSendCurrency && selectedReceiveCurrency && MOCK_EXCHANGE_RATES[selectedSendCurrency.code]?.[selectedReceiveCurrency.code] && (
            <Text style={styles.exchangeRateText}>
              1 {selectedSendCurrency.code} ≈ {MOCK_EXCHANGE_RATES[selectedSendCurrency.code][selectedReceiveCurrency.code].toFixed(4)} {selectedReceiveCurrency.code}
            </Text>
          )}


          {/* Currency Pills - Receiver (Often fixed based on recipient country, but can be selectable) */}
          <Text style={[Typography.label, styles.sectionLabel, {marginTop: 20}]}>Recipient Gets:</Text>
           <View style={styles.currencyPillsContainer}>
            {CURRENCIES.filter(c => c.code === 'GHS').map((currency) => ( // Example: Recipient always gets GHS
              <TouchableOpacity
                key={currency.code}
                style={[styles.currencyPill, selectedReceiveCurrency.code === currency.code && styles.selectedPill]}
                onPress={() => handleCurrencySelection(currency, 'receive')}
                disabled // If recipient currency is fixed
              >
                 <Ionicons
                    name={currency.icon}
                    size={18}
                    color={selectedReceiveCurrency.code === currency.code ? Colors.textOnPrimaryCTA : Colors.brandPurple}
                    style={{marginRight: 5}}
                />
                <Text style={[styles.pillText, selectedReceiveCurrency.code === currency.code && styles.selectedPillText]}>
                  {currency.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Amount Input - Receiver */}
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              value={receiveAmount}
              onChangeText={(text) => handleAmountChange(text, 'receive')}
              onFocus={() => setIsSendingCrypto(false)}
            />
            <Text style={styles.currencyLabelInInput}>{selectedReceiveCurrency.code}</Text>
          </View>

          <Text style={styles.feeInfoText}>Transaction fees may apply. Final amount will be shown on the review screen.</Text>

        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={goToReview}>
          <Text style={Typography.button}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 15 : 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 5,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipientSummaryCard: {
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 8,
    color: Colors.textSecondary,
  },
  currencyPillsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap', // Allow wrapping if many currencies
  },
  currencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20, // Pill shape
    borderWidth: 1,
    borderColor: Colors.brandPurple, // Use brandPurple for border
    marginRight: 10,
    marginBottom: 10, // For wrapping
  },
  selectedPill: {
    backgroundColor: Colors.brandPurple,
    borderColor: Colors.brandPurple,
  },
  highlightedPill: { // To visually emphasize USDC/EURC as per requirement
    // No specific style here yet, could be borderColor: Colors.warning or a subtle background
  },
  pillText: {
    ...Typography.label,
    color: Colors.brandPurple,
    fontWeight: '600',
  },
  selectedPillText: {
    color: Colors.textOnPrimaryCTA,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
    marginBottom: 5, // Reduced margin
  },
  amountInput: {
    ...Typography.h1, // Large text for amount
    fontSize: 30,
    flex: 1,
    height: 60,
    color: Colors.textPrimary,
  },
  currencyLabelInInput: {
    ...Typography.h3,
    color: Colors.textMuted,
    marginLeft: 10,
  },
  exchangeRateText: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    textAlign: 'center',
    marginVertical: 10,
  },
  feeInfoText: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: Colors.brandPurple,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: Platform.OS === 'ios' ? 0 : 20, // Handle SafeArea for Android
    marginTop: 10,
  },
});

export default ChooseCurrencyScreen;
