import React, { useEffect } from 'react';
import { Image, StyleSheet, TextInput, View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './src/screens/Home';
import Details from './src/screens/Details';
import AddExpense from './src/screens/AddExpense';
import DateRangeFilter from './src/screens/Home/components/DateRangeFilter';

import { InvoiceProvider } from './src/contexts/invoiceContext.js';

import theme from './src/theme';
import useOnboarding from './src/hooks/useOnboarding';
import image from './assets/cal-lg.png';

const Stack = createStackNavigator();

export default function App() {
  const { isLoading, isOnboarded, setIsOnboarded } = useOnboarding();

  useFonts({
    SourceSansPro: require('./assets/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('./assets/SourceSansPro-Bold.ttf')
  });

  const setOnboarded = () => {
    AsyncStorage.setItem('@e-wfh-onboarded', JSON.stringify(true));
    setIsOnboarded(true)
  }

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
  }, [])

  if (!isOnboarded) {
    return (
      <Onboarding
        showSkip={false}
        onDone={() => setOnboarded()}
        pages={[
          {
            backgroundColor: '#fff',
            image:  <Image source={image} style={styles.image} />,
            title: 'Welcome to eWFH',
            subtitle: 'Track your expenses while working from home',
          },
          {
            backgroundColor: '#fe6e58',
            image:  <Image source={image} style={styles.image} />,
            title: 'Track your Tax Relief',
            subtitle: 'View total tax relief available',
          },
          {
            backgroundColor: '#999',
            image:  <Image source={image} style={styles.image} />,
            title: 'Claim Your Tax Relief',
            subtitle: "Download your expenses using eWFH and submit your claim to Revenue",
          },
          // {
          //   backgroundColor: '#fff',
          //   image:  <Image source={image} style={styles.image} />,
          //   title: (
          //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          //       <Image source={image} style={styles.image} />
          //       <Text>What's your name?</Text>
          //       <TextInput onChangeText={(value) => setName(value)} value={name} />
          //     </View>
          //   ),
          //   subtitle: "Download your expenses using eWFH and submit your claim to Revenue",
          // },
        ]}
      />
    )
  }

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

const styles = StyleSheet.create({
  image: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    marginLeft: 10
  },
});