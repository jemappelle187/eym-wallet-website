import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Changed from ({ navigation, route }) to ({ navigation, onLogout: passedOnLogout })
const ProfileSettingsScreen = ({ navigation, onLogout: passedOnLogout }) => {

  // Use the passedOnLogout prop directly, with a fallback for safety (though it should always be passed by MainNavigator)
  const onLogout = passedOnLogout || (() => {
    Alert.alert("Logout Error", "Logout function was not passed correctly. Please check navigator setup.");
    // This fallback navigation is a last resort and won't clear global state managed in App.js
    // navigation.navigate('Login'); // This won't work as expected without App.js state change
  });

  const mockUser = {
    name: 'Demo User',
    email: 'user@sendnreceive.africa',
    phone: '+254 700 123 456',
    memberSince: 'Jan 15, 2023',
  };

  const settingsOptions = [
    { id: 'edit_profile', title: 'Edit Profile', icon: 'person-outline', action: () => Alert.alert('Edit Profile', 'Navigation to edit profile screen (not implemented).') },
    { id: 'notifications', title: 'Notification Settings', icon: 'notifications-outline', action: () => Alert.alert('Notifications', 'Navigation to notification settings (not implemented).') },
    { id: 'security', title: 'Security & Privacy', icon: 'shield-checkmark-outline', action: () => Alert.alert('Security', 'Navigation to security settings (not implemented).') },
    { id: 'linked_accounts', title: 'Linked Accounts', icon: 'link-outline', action: () => Alert.alert('Linked Accounts', 'Navigation to linked accounts (not implemented).') },
    { id: 'help', title: 'Help & Support', icon: 'help-circle-outline', action: () => Alert.alert('Help', 'Navigation to help center (not implemented).') },
    { id: 'about', title: 'About SendNReceive', icon: 'information-circle-outline', action: () => Alert.alert('About', 'Display app version and info (not implemented).') },
  ];

  const handleLogoutPress = () => { // Renamed to avoid conflict with onLogout prop
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            if (typeof onLogout === 'function') {
              onLogout(); // Call the function passed from App.js via MainNavigator
            } else {
              Alert.alert("Logout Error", "Logout functionality is not available.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Ionicons name="person-circle-outline" size={80} color="#004AAD" />
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userEmail}>{mockUser.email}</Text>
        </View>

        {settingsOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.optionItem} onPress={option.action}>
            <Ionicons name={option.icon} size={24} color="#004AAD" style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#ccc" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Ionicons name="log-out-outline" size={24} color="#D32F2F" style={styles.optionIcon} />
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.appVersion}>App Version 1.0.0 (MVP)</Text>
      </ScrollView>
    </View>
  );
};

// Styles (remain the same as previously defined)
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
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom:10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  optionItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: '600',
  },
  appVersion: {
      textAlign: 'center',
      marginTop: 30,
      color: '#aaa',
      fontSize: 12,
  }
});

export default ProfileSettingsScreen;
