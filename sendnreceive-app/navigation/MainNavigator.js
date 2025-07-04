import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import DepositScreen from '../screens/DepositScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import ReceiveMoneyScreen from '../screens/ReceiveMoneyScreen';
import PayInStoreScreen from '../screens/PayInStoreScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen'; // Import ProfileSettingsScreen

const Stack = createStackNavigator();

// Accept onLogout prop from App.js
const MainNavigator = ({ onLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        // If Dashboard needed onLogout, it would be passed here:
        // initialParams={{ onLogout: onLogout }}
        // or as a child function:
        // {props => <DashboardScreen {...props} onLogout={onLogout} />}
      />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
      <Stack.Screen name="PayInStore" component={PayInStoreScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen
        name="ProfileSettings"
        // Pass onLogout to ProfileSettingsScreen component as a direct prop
      >
        {props => <ProfileSettingsScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;
