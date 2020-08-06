import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useFonts } from 'expo-font'

import useInitUser from './src/hooks/useInitUser';

import HomeScreen from './src/screens/Home';
import ProfileScreen from './src/screens/Profile';
import AboutScreen from './src/screens/About';
import AddItem from './src/screens/AddItem';

import theme from './src/theme';

const Drawer = createDrawerNavigator();

export default function App() {
  const [loaded] = useFonts({
    SourceSansPro: require('./assets/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('./assets/SourceSansPro-Bold.ttf')
  });

  // const{ isLoading } = useInitUser();

  if (!loaded) {
    return (
      <View style={{
        position: 'absolute',
        top: 0, 
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#E5E7E9',
        display: 'flex'
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color="#3498db" />
        </View>
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar hidden />
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
          />
          <Drawer.Screen
            name="AddItem"
            component={AddItem}
            options={{
              drawerLabel: () => null
          }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
