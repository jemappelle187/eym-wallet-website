// sendnreceive-app/screens/AccountScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { AuthContext } from '../contexts/AuthContext'; // Assuming path
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const { user, logout } = useContext(AuthContext); // Assuming logout function exists in AuthContext
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout && logout() } // Call logout from context
    ]);
  };

  const menuItems = [
    {
      title: 'Account & Security',
      items: [
        { label: 'Edit Profile', icon: 'person-outline', screen: 'ProfileSettings', type: 'navigation' }, // Navigate to existing ProfileSettings
        { label: 'Change Password', icon: 'lock-closed-outline', action: () => Alert.alert('Security', 'Change Password screen coming soon!') },
        { label: 'Two-Factor Authentication', icon: 'shield-checkmark-outline', action: () => Alert.alert('Security', '2FA settings coming soon!') },
      ],
    },
    {
      title: 'Payment & Cards',
      items: [
        { label: 'Payment Methods', icon: 'card-outline', action: () => Alert.alert('Payments', 'Manage payment methods screen coming soon!') },
        { label: 'My Virtual Cards', icon: 'wallet-outline', action: () => Alert.alert('Virtual Cards', 'Virtual cards feature coming soon!') },
        // { label: 'Transaction Limits', icon: 'swap-horizontal-circle-outline', action: () => Alert.alert('Limits', 'Transaction limits screen coming soon!') },
      ],
    },
    {
      title: 'Preferences & Support',
      items: [
        { label: 'Language', icon: 'language-outline', action: () => Alert.alert('Preferences', 'Language settings coming soon!') },
        { label: 'Notifications', icon: 'notifications-outline', action: () => Alert.alert('Preferences', 'Notification settings coming soon!') },
        { label: 'Invite Friends', icon: 'people-outline', screen: 'InviteFriends', type: 'navigation' }, // Added Invite Friends
        { label: 'Help & Support', icon: 'help-circle-outline', action: () => Alert.alert('Support', 'Help center coming soon!') },
        { label: 'Contact Us', icon: 'chatbubble-ellipses-outline', action: () => Alert.alert('Support', 'Contact Us screen coming soon!') },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Terms of Service', icon: 'document-text-outline', action: () => Alert.alert('Legal', 'Terms of Service screen coming soon!') },
        { label: 'Privacy Policy', icon: 'shield-outline', action: () => Alert.alert('Legal', 'Privacy Policy screen coming soon!') },
      ],
    },
  ];

  const MenuItem = ({ label, icon, onPress, isLast }) => (
    <TouchableOpacity style={[styles.menuItemButton, isLast && styles.menuItemButtonLast]} onPress={onPress}>
      <Ionicons name={icon} size={22} color={Colors.textSecondary} style={styles.menuItemIcon} />
      <Text style={styles.menuItemText}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={Typography.h1}>Account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-circle-outline" size={60} color={Colors.brandPurple} />
          </View>
          <Text style={styles.profileName}>{user?.fullName ?? 'Your Name'}</Text>
          <Text style={styles.profileEmail}>{user?.email ?? 'your.email@example.com'}</Text>
          <View style={styles.membershipBadge}>
            <Ionicons name="star-outline" size={14} color={Colors.brandPurple} />
            <Text style={styles.membershipText}>Gold Member</Text>
          </View>
        </View>

        {/* Virtual Cards Mockup - Simple Placeholder */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Virtual Cards</Text>
            <View style={styles.virtualCardMock}>
                <MaterialCommunityIcons name="credit-card-chip-outline" size={30} color={Colors.brandPurple} />
                <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={Typography.h4}>Visa Debit Card</Text>
                    <Text style={Typography.bodyRegular}>**** **** **** 1234</Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert("Manage Cards", "Virtual card management coming soon!")}>
                    <Text style={Typography.link}>Manage</Text>
                </TouchableOpacity>
            </View>
        </View>


        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <MenuItem
                key={itemIndex}
                label={item.label}
                icon={item.icon}
                onPress={() => {
                  if (item.type === 'navigation' && item.screen) {
                    navigation.navigate(item.screen);
                  } else if (item.action) {
                    item.action();
                  }
                }}
                isLast={itemIndex === section.items.length - 1}
              />
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.error} style={styles.menuItemIcon} />
          <Text style={[styles.menuItemText, { color: Colors.error }]}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 20 : 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'flex-start', // Align title to left
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  // Profile Section
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.cardBackground, // Subtle background for this section
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.softAccent1, // Light background for avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  profileEmail: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softAccent1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  membershipText: {
    ...Typography.label,
    color: Colors.brandPurple,
    marginLeft: 5,
    fontWeight: '600',
  },
  // Menu Sections
  sectionContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    overflow: 'hidden', // Ensures border radius is applied to children
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5, // Reduced bottom padding
  },
  menuItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.cardBackground, // Ensure item bg is consistent
    borderTopWidth: 1, // Separator line
    borderTopColor: Colors.border,
  },
  menuItemButtonLast: {
    // No special style for last item in this design, but can be used if needed
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    flex: 1, // Take remaining space
  },
  // Virtual Card Mock
  virtualCardMock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    // backgroundColor: Colors.softAccent1, // Optional distinct background
    // borderRadius: 8,
    // margin: 10, // If inside section title
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 10, // Space from last section
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default AccountScreen;
