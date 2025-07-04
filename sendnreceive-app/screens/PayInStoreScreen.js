import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PayInStoreScreen = ({ navigation }) => {

  const handleScanQrCode = () => {
    // Simulate QR code scan and payment
    // In a real app, you would use a library like expo-camera and expo-barcode-scanner
    Alert.alert(
      'Payment Successful (Mock)',
      'Paid $25.50 to Mock Merchant XYZ.'
    );
    // Optionally navigate back or to a confirmation screen
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay in Store</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructions}>
          Center the merchant's QR code in the frame below to make a payment.
        </Text>

        {/* Camera Viewfinder Placeholder */}
        <View style={styles.cameraPlaceholder}>
          <Ionicons name="scan-outline" size={100} color="#004AAD" />
          <Text style={styles.cameraPlaceholderText}>Camera View</Text>
          <View style={styles.cornerBrackets}>
            <View style={[styles.bracket, styles.topLeft]} />
            <View style={[styles.bracket, styles.topRight]} />
            <View style={[styles.bracket, styles.bottomLeft]} />
            <View style={[styles.bracket, styles.bottomRight]} />
          </View>
        </View>

        <TouchableOpacity style={styles.scanButton} onPress={handleScanQrCode}>
          <Ionicons name="camera-outline" size={24} color="#fff" style={styles.scanButtonIcon} />
          <Text style={styles.scanButtonText}>Simulate QR Scan & Pay</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
            Ensure you have sufficient balance before scanning.
        </Text>
      </View>
    </View>
  );
};

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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  cameraPlaceholder: {
    width: 280,
    height: 280,
    backgroundColor: '#e0e0e0', // Light grey background
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#004AAD',
    position: 'relative', // For corner brackets
  },
  cameraPlaceholderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#004AAD',
  },
  cornerBrackets: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#004AAD',
  },
  topLeft: {
    top: 10,
    left: 10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
  },
  topRight: {
    top: 10,
    right: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#004AAD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
  },
  scanButtonIcon: {
    marginRight: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default PayInStoreScreen;
