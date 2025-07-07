// sendnreceive-app/screens/TransactionHistoryScreen.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Mock transactions with varied dates for grouping
const mockTransactions = [
  { id: '1', type: 'received', amount: '50.00', currency: 'USD', from: 'John D.', date: new Date().toISOString(), status: 'Completed', details: 'Payment for freelance work' },
  { id: '2', type: 'sent', amount: '100.00', currency: 'USD', to: 'Jane S.', date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Completed', details: 'Birthday gift' }, // 2 days ago
  { id: '3', type: 'deposit', amount: '200.00', currency: 'USD', method: 'Credit Card', date: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'Completed', details: 'Account funding' }, // 5 days ago
  { id: '4', type: 'withdrawal', amount: '75.00', currency: 'USD', method: 'Bank Transfer', date: new Date(Date.now() - 86400000 * 8).toISOString(), status: 'Pending', details: 'Withdrawal to savings' }, // 8 days ago
  { id: '5', type: 'received', amount: '120.50', currency: 'EUR', from: 'Alex G.', date: new Date(Date.now() - 86400000 * 15).toISOString(), status: 'Completed', details: 'Project payment' }, // 15 days ago
  { id: '6', type: 'sent', amount: '30.00', currency: 'GHS', to: 'Local Shop', date: new Date(Date.now() - 86400000 * 35).toISOString(), status: 'Completed', details: 'Groceries' }, // 35 days ago
  { id: '7', type: 'pay_in_store', amount: '15.00', currency: 'USD', merchant: 'Coffee Place', date: new Date().toISOString(), status: 'Completed', details: 'Morning coffee' },
];

const groupTransactionsByDate = (transactions) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is start of week
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const groups = {
    Today: [],
    Yesterday: [],
    'This Week': [], // Transactions from Sunday to today, excluding today and yesterday
    'This Month': [], // Transactions this month, excluding this week
    'Older': [] // Transactions older than this month
  };

  transactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest first

  transactions.forEach(tx => {
    const txDate = new Date(tx.date);
    if (txDate.toDateString() === today.toDateString()) {
      groups.Today.push(tx);
    } else if (txDate.toDateString() === yesterday.toDateString()) {
      groups.Yesterday.push(tx);
    } else if (txDate >= startOfWeek) {
      groups['This Week'].push(tx);
    } else if (txDate >= startOfMonth) {
      groups['This Month'].push(tx);
    } else {
      groups.Older.push(tx);
    }
  });
  return groups;
};


const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [displayedTransactions, setDisplayedTransactions] = useState(mockTransactions); // Keep original for filtering
  const [filter, setFilter] = useState({ type: 'all', dateRange: 'all' }); // 'all', 'sent', 'received', 'deposit', 'withdrawal'

  // Grouped transactions for display
  const groupedTransactions = useMemo(() => {
    let transactionsToDisplay = mockTransactions;
    // Apply type filter
    if (filter.type !== 'all') {
      transactionsToDisplay = transactionsToDisplay.filter(tx => tx.type === filter.type);
    }
    // Date range filter can be added here
    return groupTransactionsByDate(transactionsToDisplay);
  }, [filter]);


  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [groupedTransactions]);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const renderTransactionItem = ({ item }) => {
    const isDebit = item.type === 'sent' || item.type === 'withdrawal' || item.type === 'pay_in_store';
    const amountColor = isDebit ? Colors.error : Colors.success;
    const amountPrefix = isDebit ? '-' : '+';

    let iconName = 'help-circle-outline';
    let iconColor = Colors.textMuted;

    if (item.type === 'received') { iconName = 'arrow-down-outline'; iconColor = Colors.success; }
    else if (item.type === 'sent') { iconName = 'arrow-up-outline'; iconColor = Colors.error; }
    else if (item.type === 'deposit') { iconName = 'wallet-outline'; iconColor = Colors.info; }
    else if (item.type === 'withdrawal') { iconName = 'cash-outline'; iconColor = Colors.warning; }
    else if (item.type === 'pay_in_store') { iconName = 'cart-outline'; iconColor = Colors.brandPurple; }

    let title = '';
    if (item.type === 'received') title = `Received from ${item.from}`;
    else if (item.type === 'sent') title = `Sent to ${item.to}`;
    else if (item.type === 'deposit') title = `Deposit via ${item.method}`;
    else if (item.type === 'withdrawal') title = `Withdrawal to ${item.method}`;
    else if (item.type === 'pay_in_store') title = `Paid at ${item.merchant}`;

    return (
      <TouchableOpacity style={styles.transactionItem} onPress={() => handleSelectTransaction(item)}>
        <View style={[styles.transactionIconContainer, { backgroundColor: Colors.cardBackground }]}>
            <Ionicons name={iconName} size={20} color={iconColor} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()} -
            <Text style={{
                color: item.status === 'Pending' ? Colors.warning : (item.status === 'Completed' ? Colors.success : Colors.textMuted),
                fontWeight: item.status === 'Pending' ? 'bold' : 'normal'
            }}>
              {' '}{item.status}
            </Text>
          </Text>
        </View>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {amountPrefix}{item.currency} {item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const filterButtons = [
    { label: 'All', type: 'all'},
    { label: 'Sent', type: 'sent'},
    { label: 'Received', type: 'received'},
    { label: 'Deposits', type: 'deposit'},
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Custom Light Header */}
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HomeDashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={Typography.h2}>Activity</Text>
           <TouchableOpacity onPress={() => Alert.alert("More Filters", "Advanced date range filters coming soon!")} style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {filterButtons.map(btn => (
              <TouchableOpacity
                key={btn.type}
                style={[styles.filterChip, filter.type === btn.type && styles.filterChipActive]}
                onPress={() => setFilter(prev => ({...prev, type: btn.type}))}
              >
                <Text style={[styles.filterChipText, filter.type === btn.type && styles.filterChipTextActive]}>{btn.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={Object.entries(groupedTransactions).filter(([key, value]) => value.length > 0)}
          keyExtractor={([key]) => key}
          renderItem={({ item: [groupTitle, transactionsInGroup] }) => (
            <View>
              {renderSectionHeader(groupTitle)}
              <FlatList
                data={transactionsInGroup}
                renderItem={renderTransactionItem}
                keyExtractor={tx => tx.id}
                scrollEnabled={false} // Outer FlatList handles scroll
              />
            </View>
          )}
          ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyText}>No transactions match your filters.</Text></View>}
          contentContainerStyle={styles.listContent}
        />

        {selectedTransaction && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
              <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                <Text style={styles.modalTitle}>Transaction Details</Text>
                <ScrollView>
                    <View style={styles.detailItem}><Text style={styles.detailLabel}>Type:</Text><Text style={styles.detailValue}>{selectedTransaction.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text></View>
                    <View style={styles.detailItem}><Text style={styles.detailLabel}>Amount:</Text><Text style={styles.detailValue}>{selectedTransaction.currency} {selectedTransaction.amount}</Text></View>
                    <View style={styles.detailItem}><Text style={styles.detailLabel}>Date:</Text><Text style={styles.detailValue}>{new Date(selectedTransaction.date).toLocaleString()}</Text></View>
                    <View style={styles.detailItem}><Text style={styles.detailLabel}>Status:</Text><Text style={[styles.detailValue, {color: selectedTransaction.status === 'Pending' ? Colors.warning : Colors.success }]}>{selectedTransaction.status}</Text></View>
                    {selectedTransaction.from && <View style={styles.detailItem}><Text style={styles.detailLabel}>From:</Text><Text style={styles.detailValue}>{selectedTransaction.from}</Text></View>}
                    {selectedTransaction.to && <View style={styles.detailItem}><Text style={styles.detailLabel}>To:</Text><Text style={styles.detailValue}>{selectedTransaction.to}</Text></View>}
                    {selectedTransaction.method && <View style={styles.detailItem}><Text style={styles.detailLabel}>Method:</Text><Text style={styles.detailValue}>{selectedTransaction.method}</Text></View>}
                    {selectedTransaction.merchant && <View style={styles.detailItem}><Text style={styles.detailLabel}>Merchant:</Text><Text style={styles.detailValue}>{selectedTransaction.merchant}</Text></View>}
                    <View style={styles.detailItem}><Text style={styles.detailLabel}>Details:</Text><Text style={styles.detailValue}>{selectedTransaction.details}</Text></View>
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // Use new background
  },
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
    borderBottomColor: Colors.border, // Light border
  },
  backButton: { padding: 5 },
  filterButton: { padding: 5 },
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterScroll: {
    paddingHorizontal: 15,
  },
  filterChip: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: Colors.brandPurple,
    borderColor: Colors.brandPurple,
  },
  filterChipText: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.textOnPrimaryCTA,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    ...Typography.h4,
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: Colors.background, // Ensure header bg matches
  },
  transactionItem: {
    backgroundColor: Colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15, // Add horizontal margin to items
    borderRadius: 10,
    marginBottom: 10, // Space between items
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transactionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    ...Typography.bodyLarge,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  transactionDate: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
  },
  transactionAmount: {
    ...Typography.bodyLarge,
    fontWeight: '600',
  },
  emptyContainer:{
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    ...Typography.bodyRegular,
    color: Colors.textMuted,
  },
  // Modal Styles (updated)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', // Center modal vertically
    alignItems: 'center', // Center modal horizontally
  },
  modalContent: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 15,
    width: '90%', // Responsive width
    maxHeight: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  detailValue: {
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
    flexShrink: 1, // Allow text to wrap
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: Colors.brandPurple,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    ...Typography.button,
    color: Colors.textOnPrimaryCTA, // Ensure text is white on purple
  },
});

export default TransactionHistoryScreen;
