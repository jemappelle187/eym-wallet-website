// sendnreceive-app/screens/HomeScreen.js
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Platform,
  LayoutAnimation,
  ActivityIndicator,
  Alert,
  UIManager
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'; // Assuming Colors.js is updated
import { Typography } from '../constants/Typography'; // Assuming Typography.js is updated
// QuickActionCard is not used in the new design based on "Eliminate “Quick Actions” or reduce to 2-3 icons max"
// I will remove it for now to achieve a cleaner look, can be added back if 2-3 essential icons are decided.
// import QuickActionCard from '../components/QuickActionCard';
import { AuthContext } from '../contexts/AuthContext';
import { TransactionContext } from '../contexts/TransactionContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const formatCurrency = (amount, currencyCode = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
};

const HomeScreen = () => {
  const { user, updateUserKycStatus } = useContext(AuthContext);
  const { transactions, fetchTransactionHistory, isLoadingTransactions } = useContext(TransactionContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTransactionHistory();
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  }, [fetchTransactionHistory]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [transactions]);

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItemContainer}
      onPress={() => Alert.alert('Transaction Detail', `Details for transaction ID: ${item._id}`)}
    >
      <View style={styles.transactionItemIcon}>
        {item.type === 'received' && <MaterialIcons name="arrow-downward" size={20} color={Colors.success} />}
        {item.type === 'sent' && <MaterialIcons name="arrow-upward" size={20} color={Colors.error} />}
        {item.type === 'deposit' && <MaterialCommunityIcons name="wallet-plus-outline" size={20} color={Colors.info} />}
        {item.type === 'withdrawal' && <MaterialCommunityIcons name="wallet-minus-outline" size={20} color={Colors.warning} />}
        {item.type === 'pay_in_store' && <MaterialCommunityIcons name="storefront-outline" size={20} color={Colors.brandPurple} />}
      </View>
      <View style={styles.transactionItemDetails}>
        <Text style={styles.transactionItemTitle} numberOfLines={1}>
          {item.type === 'received' ? `Received from ${item.recipientName || 'Unknown'}` :
           item.type === 'sent' ? `Sent to ${item.recipientName || 'Unknown'}` :
           item.type === 'deposit' ? 'Deposit to Wallet' :
           item.type === 'withdrawal' ? 'Withdrawal from Wallet' :
           item.type === 'pay_in_store' ? `Paid at ${item.recipientName || 'Merchant'}` : 'Transaction'}
        </Text>
        <Text style={styles.transactionItemDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text
        style={[
          styles.transactionItemAmount,
          { color: (item.type === 'received' || item.type === 'deposit') ? Colors.success : Colors.error },
        ]}
      >
        {(item.type === 'received' || item.type === 'deposit') ? '+' : '-'}
        {formatCurrency(item.sourceAmount, item.sourceCurrency)}
      </Text>
    </TouchableOpacity>
  );

  const mockBalance = {
      main: 1250.75,
      mainCurrency: 'USD',
      secondaryBalances: [
          {amount: 980.50, currency: 'EUR'},
          {amount: 150000.00, currency: 'GHS'} // Changed KES to GHS as per app context
      ]
  };

  // Removed mockRate as "Current Rate" card is removed for minimalism.
  // Send Money CTA will be primary.

  // Profile icon alert for KYC
  const kycAlertNeeded = user?.kycStatus !== 'verified';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
        {/* Custom Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={Typography.bodySmall}>Welcome Back,</Text>
            <Text style={Typography.h2}>{user?.fullName?.split(' ')[0] ?? 'User'}!</Text>
          </View>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => Alert.alert('Notifications', 'Notifications screen coming soon!')}>
              <Ionicons name="notifications-outline" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => navigation.navigate('ProfileSettings')} // Ensure 'ProfileSettings' route exists
            >
              <Ionicons name="person-circle-outline" size={26} color={Colors.textSecondary} />
              {kycAlertNeeded && <View style={styles.kycAlertBadge} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* KYC Banner - more subtle */}
        {kycAlertNeeded && (
          <TouchableOpacity
            style={styles.kycBanner}
            onPress={() => {
                Alert.alert('KYC Verification', 'Navigate to KYC screen (not implemented). \nFor demo, we will mark KYC as verified.');
                if (updateUserKycStatus) updateUserKycStatus('verified');
            }}
          >
            <MaterialCommunityIcons name="shield-alert-outline" size={24} color={Colors.warning} />
            <View style={styles.kycBannerTextContainer}>
              <Text style={styles.kycBannerTitle}>Verify your identity</Text>
              <Text style={styles.kycBannerSubtitle}>Unlock full account features.</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}

        {/* Wallet Card - Cleaner */}
        <View style={styles.walletInfoCard}>
            <Text style={Typography.label}>Total Balance</Text>
            <Text style={Typography.mainBalance}>
                {formatCurrency(mockBalance.main, mockBalance.mainCurrency)}
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("View Details", "Balance details screen coming soon!")}>
                <Text style={styles.balanceDetailsText}>
                    {mockBalance.secondaryBalances.map(b => `${b.currency}`).join(' / ')} Balances • View Details
                </Text>
            </TouchableOpacity>

            {/* Add/Withdraw buttons - cleaner and secondary */}
            <View style={styles.walletCardActions}>
                <TouchableOpacity
                    style={[styles.walletActionButton, styles.addMoneyButton]}
                    onPress={() => navigation.navigate('Deposit')} // Ensure 'Deposit' route exists
                >
                    <Ionicons name="arrow-down-circle-outline" size={20} color={Colors.textOnPrimaryCTA} style={{marginRight: 6}}/>
                    <Text style={[Typography.button, styles.walletActionButtonText]}>Add Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.walletActionButton, styles.withdrawMoneyButton]}
                    onPress={() => navigation.navigate('Withdraw')} // Ensure 'Withdraw' route exists
                >
                    <Ionicons name="arrow-up-circle-outline" size={20} color={Colors.brandPurple} style={{marginRight: 6}}/>
                    <Text style={[Typography.button, {color: Colors.brandPurple}]}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Primary CTA: Send Money */}
        <TouchableOpacity
            style={styles.primarySendCTA}
            onPress={() => navigation.navigate('SendFlowModal')} // Updated to navigate to the new modal send flow
        >
            <MaterialCommunityIcons name="send-outline" size={24} color={Colors.textOnPrimaryCTA} />
            <Text style={styles.primarySendCTAText}>Send Money</Text>
        </TouchableOpacity>

        {/* Promo Banner - Thin card with soft accent */}
        <TouchableOpacity style={styles.promoCard} onPress={() => Alert.alert("Promotion", "Details about the promotion.")}>
          <Ionicons name="gift-outline" size={24} color={Colors.promotionText} />
          <View style={styles.promoCardTextContainer}>
            <Text style={styles.promoCardTitle}>Send to Ghana, Fee-Free!</Text>
            <Text style={styles.promoCardSubtitle}>This month only. Tap to learn more.</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Recent Activity Section */}
        <View style={styles.activityHeader}>
          <Text style={Typography.h3}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistoryFromHome')}>
            <Text style={Typography.link}>View All</Text>
          </TouchableOpacity>
        </View>

        {isLoadingTransactions && transactions.length === 0 ? (
          <ActivityIndicator size="large" color={Colors.brandPurple} style={{marginTop: 30}}/>
        ) : transactions.length === 0 ? (
          <View style={styles.noActivityContainer}>
            <Ionicons name="file-tray-outline" size={48} color={Colors.textMuted} />
            <Text style={Typography.bodyRegular}>No recent transactions yet.</Text>
            <Text style={Typography.bodySmall}>Your transactions will appear here.</Text>
          </View>
        ) : (
          <FlatList
            data={transactions.slice(0, 3)} // Show only first 3 for homescreen
            keyExtractor={(item) => item._id}
            renderItem={renderTransactionItem}
            scrollEnabled={false} // ScrollView handles overall scroll
            ItemSeparatorComponent={() => <View style={styles.activitySeparator} />}
            style={styles.activityList}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Light, clean interface
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Ample whitespace at the bottom
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? 20 : 15,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4, // Easier to tap
  },
  kycAlertBadge: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.warning,
    borderWidth: 1,
    borderColor: Colors.background,
  },
  // KYC Banner - Subtle
  kycBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softAccent1, // Soft accent
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  kycBannerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  kycBannerTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  kycBannerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  // Wallet Card
  walletInfoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    // Minimal shadow for depth, or remove for flatter design
    shadowColor: Colors.darkCharcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  balanceDetailsText: {
    ...Typography.bodySmall,
    color: Colors.brandPurple,
    marginTop: 4,
    marginBottom: 16, // Space before buttons
  },
  walletCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spread buttons
    marginTop: 10,
  },
  walletActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1, // Make buttons take equal width
  },
  addMoneyButton: {
    backgroundColor: Colors.brandPurple, // Primary action color
    marginRight: 8, // Space between buttons
  },
  withdrawMoneyButton: {
    backgroundColor: Colors.background, // Secondary, lighter button
    borderWidth: 1,
    borderColor: Colors.brandPurple,
    marginLeft: 8, // Space between buttons
  },
  walletActionButtonText: { // For Add Money button
    ...Typography.button,
    fontSize: 14, // Slightly smaller for card buttons
  },
  // Primary Send CTA
  primarySendCTA: {
    backgroundColor: Colors.brandPurple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: Colors.brandPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primarySendCTAText: {
    ...Typography.button,
    fontSize: 18,
    marginLeft: 10,
  },
  // Promo Banner - Thin Card
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softAccent1, // Soft accent color
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.border, // Subtle border
  },
  promoCardTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  promoCardTitle: {
    ...Typography.label, // Use label style for concise title
    fontWeight: '600',
    color: Colors.promotionText, // Specific promo text color
  },
  promoCardSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  // Activity Section
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityList: {
    // No specific styling needed if items handle their own bg and spacing
  },
  transactionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10, // Space between items
  },
  transactionItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18, // Circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // Match main background for icon "cutout" feel
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transactionItemDetails: {
    flex: 1,
  },
  transactionItemTitle: {
    ...Typography.bodyLarge, // Clearer title
    fontWeight: '500', // Medium weight
    color: Colors.textPrimary,
  },
  transactionItemDate: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
  },
  transactionItemAmount: {
    ...Typography.bodyLarge, // Consistent size
    fontWeight: '600', // Semi-bold
  },
  activitySeparator: {
    height: 0, // Remove default separator if items have margin
  },
  // No Activity State
  noActivityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginTop: 10,
  },
});

export default HomeScreen;
