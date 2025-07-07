// sendnreceive-app/screens/ReviewSendScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useNavigation, useRoute } from '@react-navigation/native';

const formatCurrencyForReview = (amount, currencyCode) => {
  return `${amount.toFixed(2)} ${currencyCode}`;
};

const ReviewSendScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    selectedRecipient,
    sendAmount,
    receiveAmount,
    sendCurrency,
    receiveCurrency,
    exchangeRate,
  } = route.params;

  // Mock fees - replace with actual fee calculation logic
  const MOCK_FEE_PERCENTAGE = 0.01; // 1% fee
  const calculatedFee = sendAmount * MOCK_FEE_PERCENTAGE;
  const totalToSend = sendAmount + calculatedFee;

  const handleConfirmAndSend = () => {
    // Logic to initiate the actual transaction
    // For now, show an alert and navigate back to home or a success screen
    Alert.alert(
      "Confirm & Send",
      `Sending ${formatCurrencyForReview(sendAmount, sendCurrency.code)} to ${selectedRecipient.name}.\nTotal including fees: ${formatCurrencyForReview(totalToSend, sendCurrency.code)}.\n\nThis is a mock action. No real transaction will occur.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () => {
            // navigation.popToTop(); // Go back to HomeScreen
            // Or navigate to a dedicated success/pending screen
            navigation.navigate('HomeScreen', { transactionStatus: 'pending' });
            Alert.alert("Sent!", `${selectedRecipient.name} will receive ${formatCurrencyForReview(receiveAmount, receiveCurrency.code)} shortly.`);
          }
        }
      ]
    );
  };

  const DetailRow = ({ label, value, isEmphasized = false, valueColor }) => (
    <View style={styles.detailRow}>
      <Text style={isEmphasized ? styles.detailLabelEmphasized : styles.detailLabel}>{label}</Text>
      <Text style={[isEmphasized ? styles.detailValueEmphasized : styles.detailValue, valueColor && {color: valueColor}]}>
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={Typography.h2}>Review & Send</Text>
        <View style={{width: 40}} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Transaction Summary</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipient</Text>
            <DetailRow label="Name" value={selectedRecipient.name} />
            <DetailRow
              label={selectedRecipient.isMobileMoney ? "Mobile Number" : "Bank Details"}
              value={selectedRecipient.isMobileMoney ? selectedRecipient.mobileNumber : `${selectedRecipient.bankName} - ${selectedRecipient.accountNumber}`}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amounts</Text>
            <DetailRow label="You Send" value={formatCurrencyForReview(sendAmount, sendCurrency.code)} />
            <DetailRow label="Exchange Rate" value={`1 ${sendCurrency.code} ≈ ${exchangeRate.toFixed(4)} ${receiveCurrency.code}`} />
            <DetailRow label={`${selectedRecipient.name} Gets`} value={formatCurrencyForReview(receiveAmount, receiveCurrency.code)} isEmphasized valueColor={Colors.success} />
          </View>

          <View style={styles.separator} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fees & Total</Text>
            <DetailRow label="Transaction Fee" value={formatCurrencyForReview(calculatedFee, sendCurrency.code)} />
            <DetailRow label="Total You Pay" value={formatCurrencyForReview(totalToSend, sendCurrency.code)} isEmphasized />
          </View>
        </View>

        <Text style={styles.termsText}>
          By tapping "Confirm & Send", you agree to our Terms of Service and Privacy Policy.
          Ensure all details are correct before sending.
        </Text>

      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAndSend}>
        <MaterialCommunityIcons name="check-circle-outline" size={22} color={Colors.textOnPrimaryCTA} style={{marginRight: 8}}/>
        <Text style={Typography.button}>Confirm & Send</Text>
      </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.textPrimary,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textSecondary,
    marginBottom: 10,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
  },
  detailValue: {
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  detailLabelEmphasized: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  detailValueEmphasized: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  termsText: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    lineHeight: 18,
  },
  confirmButton: {
    backgroundColor: Colors.brandPurple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
    marginTop: 10,
  },
});

export default ReviewSendScreen;
