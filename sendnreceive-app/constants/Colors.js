// sendnreceive-app/constants/Colors.js

// Overall Vision: Premium, minimalist, light, clean, high trust, high efficiency, uniquely African.
// Brand purple for CTA or highlight. Prefer navy, charcoal, or deep green as dominant base.
// Avoid bright teal or emoji-style colors.

export const Colors = {
  // Core Palette
  brandPurple: '#6A0DAD', // Retained brand purple for CTAs and highlights (example, adjust if specific brand purple exists)
  darkCharcoal: '#2C3E50', // Dominant base color - a deep, elegant charcoal
  // navy: '#001f3f', // Alternative base: Navy
  // deepGreen: '#004D40', // Alternative base: Deep Green

  background: '#FFFFFF', // Clean white background for a light interface
  cardBackground: '#F7F9FC', // Very light grey for cards, subtle differentiation

  // Text Colors
  textPrimary: '#1A1A1A', // Primary text - very dark, almost black for high contrast
  textSecondary: '#595959', // Secondary text - for less emphasis, sub-labels
  textMuted: '#8C8C8C', // Muted text - for hints, disabled states, or tertiary info
  textOnPrimaryCTA: '#FFFFFF', // Text color for buttons/elements using brandPurple

  // Semantic Colors
  success: '#28A745', // Green for success states - clear and positive
  error: '#DC3545', // Red for error states - clear and urgent
  warning: '#FFC107', // Orange for warnings - noticeable but not alarming
  info: '#17A2B8', // Blue for informational messages/alerts

  // UI Element Specific
  border: '#E0E0E0', // Subtle borders for separation
  inputBackground: '#F0F0F0', // Background for input fields if needed
  disabled: '#D3D3D3', // Color for disabled elements

  // Accents (use sparingly, ensure they are not "emoji-style")
  softAccent1: '#E6E0F8', // A very light, desaturated purple as a soft accent for promo banners etc.
  // softAccent2: '#D1FAE5', // A very light, desaturated green as another option

  // Specific for promotions (aligning with "thin card with soft accent")
  promotionBackground: '#E6E0F8', // Using softAccent1
  promotionText: '#4B0082', // A darker, richer purple for text on promo, legible on the soft accent
};
