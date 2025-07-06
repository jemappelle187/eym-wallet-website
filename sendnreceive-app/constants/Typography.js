// sendnreceive-app/constants/Typography.js
import { StyleSheet } from 'react-native';
import { Colors } from './Colors'; // Import Colors to use them here

export const Typography = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold
    color: Colors.text,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text,
  },
  smallText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  // Add specific styles for balances
  mainBalance: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.text,
  },
  secondaryBalance: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  // For buttons
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.cardBackground, // White for buttons on colored backgrounds
  },
  // Specific text for promotional banners or special sections
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.promotionText,
  },
  promoDescription: {
    fontSize: 14,
    color: Colors.textMuted, // Or Colors.promotionText if it fits the design
  },
  // Link text style
  link: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  }
});
