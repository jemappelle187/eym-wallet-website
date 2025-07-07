// sendnreceive-app/constants/Typography.js
import { StyleSheet } from 'react-native';
import { Colors } from './Colors'; // Import updated Colors

// Typography: Use Inter, SF Pro, or modern sans-serif. Clear hierarchy between headings, subheadings, and labels.
// Using system fonts and defining hierarchy through size, weight, and color.

export const Typography = StyleSheet.create({
  // Headings
  h1: { // For primary screen titles or very large headings
    fontSize: 32,
    fontWeight: 'bold', // Heaviest weight for max emphasis
    color: Colors.textPrimary,
    marginBottom: 8, // Default spacing
  },
  h2: { // For section titles or secondary headings
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  h3: { // For card titles or tertiary headings
    fontSize: 20,
    fontWeight: '600', // Semi-bold
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  h4: { // For smaller sub-headings or important labels
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  // Body Text
  bodyLarge: { // For primary content text where more emphasis is needed
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.textPrimary,
    lineHeight: 24, // Improved readability
  },
  bodyRegular: { // Standard body text
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bodySmall: { // For less important text, captions
    fontSize: 12,
    fontWeight: 'normal',
    color: Colors.textMuted,
    lineHeight: 18,
  },

  // Labels & Controls
  label: { // For form input labels, icon labels
    fontSize: 14,
    fontWeight: '500', // Medium weight
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  button: { // Text style for primary buttons
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textOnPrimaryCTA, // White text on brandPurple buttons
  },
  link: { // For tappable link text
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brandPurple, // Use brand purple for links
  },
  pillText: { // For text inside pill selectors
    fontSize: 14,
    fontWeight: '500',
    color: Colors.brandPurple, // Or textPrimary if pills are light colored
  },

  // Specific use cases from previous Typography
  mainBalance: { // For prominent display of balances
    fontSize: 36, // Slightly reduced for cleaner look, adjust as needed
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  secondaryBalance: { // For secondary balance info (e.g., currency code)
    fontSize: 16,
    fontWeight: 'normal',
    color: Colors.textMuted,
  },
  promoTitle: { // For promotional banners
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.promotionText,
  },
  promoDescription: {
    fontSize: 14,
    color: Colors.textSecondary, // Using textSecondary for better readability on softAccent
  },

  // Utility (can add more as needed)
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textSemibold: {
    fontWeight: '600',
  }
});
