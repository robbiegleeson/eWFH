import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './src/screens/Home';
import Details from './src/screens/Details';
import AddExpense from './src/screens/AddExpense';
import DateRangeFilter from './src/screens/Home/components/DateRangeFilter';

import { InvoiceProvider } from './src/contexts/invoiceContext.js';

import theme from './src/theme';

const Stack = createStackNavigator();

export default function App() {
  useFonts({
    SourceSansPro: require('./assets/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('./assets/SourceSansPro-Bold.ttf')
  });

  useEffect(() => {
    const setSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
  
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 3000)
    }

    setSplashScreen()
  }, []);

  return (
    <InvoiceProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="DateFilter" component={DateRangeFilter} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </InvoiceProvider>
  );
}