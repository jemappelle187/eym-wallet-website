// sendnreceive-app/screens/SelectRecipientScreen.js
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useNavigation } from '@react-navigation/native';

// Mock Data - Replace with actual data source/API calls
const MOCK_RECIPIENTS = [
  { id: '1', name: 'Ama Serwaa', avatarInitials: 'AS', lastSent: '2 days ago', isMobileMoney: true, mobileNumber: '+233 24 123 4567' },
  { id: '2', name: 'Kwame Mensah', avatarInitials: 'KM', lastSent: '1 week ago', isMobileMoney: true, mobileNumber: '+233 55 765 4321' },
  { id: '3', name: 'John Doe (Bank)', avatarInitials: 'JD', lastSent: '3 weeks ago', isMobileMoney: false, bankName: 'Equity Bank', accountNumber: '**** 1234' },
  { id: '4', name: 'Fatimah Ali', avatarInitials: 'FA', lastSent: '1 month ago', isMobileMoney: true, mobileNumber: '+233 20 987 6543' },
];

const SelectRecipientScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipients = useMemo(() => {
    if (!searchQuery) {
      return MOCK_RECIPIENTS; // Show all recent if no search
    }
    return MOCK_RECIPIENTS.filter(
      (recipient) =>
        recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipient.isMobileMoney && recipient.mobileNumber.includes(searchQuery))
    );
  }, [searchQuery]);

  const handleSelectRecipient = (recipient) => {
    // Navigate to Choose Currency / Enter Amount screen
    navigation.navigate('ChooseCurrencyScreen', { selectedRecipient: recipient });
    // Alert.alert("Recipient Selected", `${recipient.name}\nNext: Choose Currency/Amount`);
  };

  const renderRecipientItem = ({ item }) => (
    <TouchableOpacity style={styles.recipientItem} onPress={() => handleSelectRecipient(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatarInitials}</Text>
      </View>
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{item.name}</Text>
        <Text style={styles.recipientDetail}>
          {item.isMobileMoney ? `Mobile: ${item.mobileNumber}` : `Bank: ${item.bankName} ${item.accountNumber}`}
        </Text>
        <Text style={styles.recipientLastSent}>Last sent: {item.lastSent}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Custom Header for this screen */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={Typography.h2}>Send To</Text>
          <TouchableOpacity onPress={() => Alert.alert("Add New Recipient", "New recipient flow coming soon!")} style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={28} color={Colors.brandPurple} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or number"
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredRecipients.length > 0 ? (
          <FlatList
            data={filteredRecipients}
            renderItem={renderRecipientItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <MaterialCommunityIcons name="account-search-outline" size={48} color={Colors.textMuted} />
            <Text style={Typography.bodyLarge}>No recipients found</Text>
            <Text style={Typography.bodyRegular}>Try a different search or add a new recipient.</Text>
          </View>
        )}

        {/* Optionally, a button to explicitly add a new recipient if not using the header one */}
        {/* <TouchableOpacity style={styles.addNewButton} onPress={() => Alert.alert("Add New", "Navigate to Add New Recipient Screen")}>
            <Ionicons name="add-outline" size={22} color={Colors.textOnPrimaryCTA} />
            <Text style={styles.addNewButtonText}>Add New Recipient</Text>
        </TouchableOpacity> */}
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
  addButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground, // Or Colors.inputBackground if defined
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    ...Typography.bodyLarge,
    flex: 1,
    height: 50, // Good touch target
    color: Colors.textPrimary,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    // shadow for items if desired
    // shadowColor: Colors.darkCharcoal,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 3,
    // elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.softAccent1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    ...Typography.h4,
    color: Colors.brandPurple,
    fontWeight: 'bold',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    ...Typography.bodyLarge,
    fontWeight: '600', // semi-bold
    color: Colors.textPrimary,
  },
  recipientDetail: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  recipientLastSent: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 4,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
//   addNewButton: { // If using a bottom button instead of header
//     backgroundColor: Colors.brandPurple,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     marginHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: Platform.OS === 'ios' ? 0 : 20, // Adjust for safe area on Android if edges not used
//     marginTop: 10,
//   },
//   addNewButtonText: {
//     ...Typography.button,
//     marginLeft: 8,
//   }
});

export default SelectRecipientScreen;
