import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'; // Import BlurView

const DashboardScreen = ({ navigation }) => {
  // Mock data (remains the same)
  const userBalance = {
    usd: '1,250.75',
    eur: '980.50',
    kes: '150,000.00',
  };

  const quickActions = [
    { id: 'deposit', title: 'Deposit', icon: 'arrow-down-circle-outline', screen: 'Deposit', color: '#00C853' }, // Green
    { id: 'withdraw', title: 'Withdraw', icon: 'arrow-up-circle-outline', screen: 'Withdraw', color: '#FFBF00' },   // Gold/Yellow
    { id: 'send', title: 'Send Money', icon: 'paper-plane-outline', screen: 'SendMoney', color: '#004AAD' },     // Primary Blue
    { id: 'pay', title: 'Pay in Store', icon: 'scan-outline', screen: 'PayInStore', color: '#E65100' },       // Orange/Terracotta
  ];

  // Helper for Glassmorphism Card
  const GlassCard = ({ children, style }) => (
    <View style={[styles.glassCardBase, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
          {children}
        </BlurView>
      ) : (
        // Fallback for Android (no perfect blur, just semi-transparent)
        <View style={[styles.androidFallback, StyleSheet.absoluteFill]}>
          {children}
        </View>
      )}
    </View>
  );


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View>
            <Text style={styles.headerWelcome}>Welcome Back,</Text>
            <Text style={styles.headerUser}>Demo User!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
          <Ionicons name="person-circle-outline" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.dashboardTitle}>Your Wallet</Text>

      {/* Balance Section with Glassmorphism */}
      <GlassCard style={styles.balanceCardContainer}>
        <View style={styles.balanceContent}>
            <Text style={styles.balanceTitle}>Total Available Balance</Text>
            <Text style={styles.balanceAmount}>${userBalance.usd}</Text>
            <View style={styles.currencyBreakdown}>
                <Text style={styles.balanceDetail}>€{userBalance.eur}</Text>
                <Text style={styles.balanceDetailSeparator}>•</Text>
                <Text style={styles.balanceDetail}>KES {userBalance.kes}</Text>
            </View>
        </View>
      </GlassCard>

      {/* Quick Actions Section */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <GlassCard key={action.id} style={styles.quickActionItemContainer}>
            <TouchableOpacity
              style={styles.quickActionTouchable}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Ionicons name={action.icon} size={30} color={action.color || '#004AAD'} />
              <Text style={[styles.quickActionText, { color: action.color || '#004AAD'}]}>{action.title}</Text>
            </TouchableOpacity>
          </GlassCard>
        ))}
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.recentTransactionsHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      {/* Mock transaction items - these are not glass cards for now for variety */}
      <View style={styles.transactionItem}>
        <Ionicons name="arrow-down-outline" size={24} color="#00C853" />
        <View style={styles.transactionDetails}>
            <Text style={styles.transactionText}>Received from John D.</Text>
            <Text style={styles.transactionSubText}>Oct 20, 2023</Text>
        </View>
        <Text style={[styles.transactionAmount, {color: "#00C853"}]}>+$50.00</Text>
      </View>
      <View style={styles.transactionItem}>
        <Ionicons name="arrow-up-outline" size={24} color="#E65100" />
        <View style={styles.transactionDetails}>
            <Text style={styles.transactionText}>Sent to Jane S.</Text>
            <Text style={styles.transactionSubText}>Oct 19, 2023</Text>
        </View>
        <Text style={[styles.transactionAmount, {color: "#E65100"}]}>-$100.00</Text>
      </View>
      {/* Placeholder for an illustration or ad */}
      <View style={styles.promoPlaceholder}>
        <Ionicons name="gift-outline" size={50} color="#004AAD" />
        <Text style={styles.promoText}>Special Promotion! Send money to Ghana with 0 fees this month.</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // Neutral light background
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#004AAD',
    paddingTop: Platform.OS === 'android' ? 40 : 60, // Adjust for status bar
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerWelcome: {
    fontSize: 16,
    color: '#e0e0e0', // Lighter text on dark bg
  },
  headerUser: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  dashboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  // Glassmorphism Card Styles
  glassCardBase: {
    borderRadius: 20, // More rounded corners for glass effect
    overflow: 'hidden', // Important for BlurView
    // Add a subtle border for better definition on some backgrounds
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1, // iOS can have thinner borders
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.5)',
    // Shadow for depth (more prominent on Android fallback)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
    shadowRadius: 5,
    elevation: Platform.OS === 'ios' ? 3 : 6,
  },
  androidFallback: { // Fallback for Android (semi-transparent background)
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Brighter fallback
  },
  balanceCardContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    minHeight: 150, // Ensure enough height for content
  },
  balanceContent: { // Content inside the GlassCard for balance
    padding: 25,
    alignItems: 'flex-start', // Align text to the left
  },
  balanceTitle: {
    fontSize: 16,
    color: Platform.OS === 'ios' ? '#333' : '#444', // Darker text for readability on blur
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36, // Larger amount
    fontWeight: 'bold',
    color: '#004AAD', // Primary brand color
    marginBottom: 15,
  },
  currencyBreakdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceDetail: {
      fontSize: 15,
      color: Platform.OS === 'ios' ? '#555' : '#666',
  },
  balanceDetailSeparator: {
      fontSize: 15,
      color: Platform.OS === 'ios' ? '#555' : '#666',
      marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 20, // Slightly larger
    fontWeight: '600', // Semi-bold
    color: '#333',
    paddingHorizontal: 20, // Consistent padding
    marginTop: 10, // Adjusted spacing
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Use space-between for even spacing
    paddingHorizontal: 20, // Padding for the grid container
  },
  quickActionItemContainer: {
    width: '48%', // Adjust width for 2 items per row with space-between
    marginBottom: 15,
    aspectRatio: 1.1, // Make them slightly taller than wide
  },
  quickActionTouchable: { // Actual touchable content
    flex: 1, // Ensure it fills the GlassCard
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentTransactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Match sectionTitle padding
    marginTop: 20, // Spacing above this section
    // marginBottom already handled by sectionTitle's margin
  },
  viewAllText: {
      fontSize: 14,
      color: '#004AAD',
      fontWeight: '600',
  },
  transactionItem: { // Standard card style, not glass, for variety
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12, // Consistent rounding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  transactionSubText: {
      fontSize: 12,
      color: '#777',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoPlaceholder: {
    backgroundColor: '#e6f0ff', // Light blue, accent color
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  promoText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#004AAD',
    marginTop: 10,
  }
});

export default DashboardScreen;
