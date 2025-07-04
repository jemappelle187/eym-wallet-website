import React, { useState, useEffect } from 'react'; // Added useEffect
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, SafeAreaView, LayoutAnimation, Platform } from 'react-native'; // Added LayoutAnimation, Platform
import { Ionicons } from '@expo/vector-icons';

// mockTransactions array definition (moved outside for clarity)
const mockTransactions = [
  { id: '1', type: 'received', amount: '50.00', currency: 'USD', from: 'John D.', date: '2023-10-20', status: 'Completed', details: 'Payment for freelance work' },
  { id: '2', type: 'sent', amount: '100.00', currency: 'USD', to: 'Jane S.', date: '2023-10-19', status: 'Completed', details: 'Birthday gift' },
  { id: '3', type: 'deposit', amount: '200.00', currency: 'USD', method: 'Credit Card', date: '2023-10-18', status: 'Completed', details: 'Account funding' },
  { id: '4', type: 'withdrawal', amount: '75.00', currency: 'USD', method: 'Bank Transfer', date: '2023-10-17', status: 'Pending', details: 'Withdrawal to savings' },
  { id: '5', type: 'received', amount: '120.50', currency: 'EUR', from: 'Alex G.', date: '2023-10-16', status: 'Completed', details: 'Project payment' },
  { id: '6', type: 'sent', amount: '30.00', currency: 'KES', to: 'Local Shop', date: '2023-10-15', status: 'Completed', details: 'Groceries' },
  { id: '7', type: 'pay_in_store', amount: '15.00', currency: 'USD', merchant: 'Coffee Place', date: '2023-10-14', status: 'Completed', details: 'Morning coffee' },
];

const TransactionHistoryScreen = ({ navigation }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    // Simulate loading transactions with animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDisplayedTransactions(mockTransactions);
  }, []); // Empty dependency array means this runs once on mount

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const renderTransactionItem = ({ item }) => {
    const isDebit = item.type === 'sent' || item.type === 'withdrawal' || item.type === 'pay_in_store';
    const amountColor = isDebit ? '#D32F2F' : '#00C853'; // Using defined palette colors more directly
    const amountPrefix = isDebit ? '-' : '+';

    let iconName = 'help-circle-outline'; // Default icon
    if (item.type === 'received') iconName = 'arrow-down-outline';
    else if (item.type === 'sent') iconName = 'arrow-up-outline';
    else if (item.type === 'deposit') iconName = 'wallet-outline';
    else if (item.type === 'withdrawal') iconName = 'cash-outline';
    else if (item.type === 'pay_in_store') iconName = 'cart-outline';


    let title = '';
    if (item.type === 'received') title = `Received from ${item.from}`;
    else if (item.type === 'sent') title = `Sent to ${item.to}`;
    else if (item.type === 'deposit') title = `Deposited via ${item.method}`;
    else if (item.type === 'withdrawal') title = `Withdrew to ${item.method}`;
    else if (item.type === 'pay_in_store') title = `Paid at ${item.merchant}`;


    return (
      <TouchableOpacity style={styles.transactionItem} onPress={() => handleSelectTransaction(item)}>
        <View style={[styles.transactionIconContainer, {backgroundColor: isDebit ? 'rgba(211, 47, 47, 0.1)' : 'rgba(0, 200, 83, 0.1)'}]}>
            <Ionicons name={iconName} size={24} color={amountColor} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.transactionDate}>
            {item.date} -
            <Text style={{
                color: item.status === 'Pending' ? '#FFBF00' : (item.status === 'Completed' ? '#00C853' : '#777'),
                fontWeight: item.status === 'Pending' ? 'bold' : 'normal'
            }}>
              {item.status}
            </Text>
          </Text>
        </View>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {amountPrefix}{item.currency} {item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction History</Text>
          <TouchableOpacity onPress={() => Alert.alert("Filter", "Filter options not implemented.")} style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={displayedTransactions}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>No transactions yet.</Text>}
        />

        {selectedTransaction && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Transaction Details</Text>

                <ScrollView>
                    <Text style={styles.detailRow}><Text style={styles.detailLabel}>Type:</Text> {selectedTransaction.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
                    <Text style={styles.detailRow}><Text style={styles.detailLabel}>Amount:</Text> {selectedTransaction.currency} {selectedTransaction.amount}</Text>
                    <Text style={styles.detailRow}><Text style={styles.detailLabel}>Date:</Text> {selectedTransaction.date}</Text>
                    <Text style={styles.detailRow}><Text style={styles.detailLabel}>Status:</Text> {selectedTransaction.status}</Text>
                    {selectedTransaction.from && <Text style={styles.detailRow}><Text style={styles.detailLabel}>From:</Text> {selectedTransaction.from}</Text>}
                    {selectedTransaction.to && <Text style={styles.detailRow}><Text style={styles.detailLabel}>To:</Text> {selectedTransaction.to}</Text>}
                    {selectedTransaction.method && <Text style={styles.detailRow}><Text style={styles.detailLabel}>Method:</Text> {selectedTransaction.method}</Text>}
                    {selectedTransaction.merchant && <Text style={styles.detailRow}><Text style={styles.detailLabel}>Merchant:</Text> {selectedTransaction.merchant}</Text>}
                    <Text style={styles.detailRow}><Text style={styles.detailLabel}>Details:</Text> {selectedTransaction.details}</Text>
                </ScrollView>

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004AAD',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    backgroundColor: '#004AAD',
    paddingTop: Platform.OS === 'android' ? 15 : 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5, // Easier to tap
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10, // Adjust if filter button makes it off-center
    flex:1, // Allow title to take up space
  },
  filterButton: {
    padding: 5, // Easier to tap
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  transactionItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2, // Softer elevation
  },
  transactionIconContainer: {
    width: 42, // Slightly smaller
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Adjust spacing
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8, // Space before amount
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '500', // Medium weight
    color: '#333',
    marginBottom: 1,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600', // Semi-bold amount
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60, // More margin
    fontSize: 17, // Larger text
    color: '#888', // Lighter color
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '65%', // Adjust height
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Lighter border
    paddingBottom: 10,
  },
  detailLabel: {
    fontWeight: '600', // Semi-bold label
    color: '#004AAD',
  },
  closeButton: {
    backgroundColor: '#004AAD',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15, // Adjust spacing
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500', // Medium weight
  },
});

export default TransactionHistoryScreen;
