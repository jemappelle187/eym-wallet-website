import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { UIManager, Platform, LayoutAnimation } from 'react-native'; // Added imports

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate screen change
    setIsUserLoggedIn(true);
    console.log('User logged in');
  };

  const handleLogout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate screen change
    setIsUserLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <MainNavigator onLogout={handleLogout} />
      ) : (
        <AuthNavigator onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
};

export default App;
