import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, Headline } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { BottomModalProvider } from 'react-native-bottom-modal';

import HomeScreen from './src/screens/Home/index-v2.js';
import ProfileScreen from './src/screens/Profile';

import theme from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    SourceSansPro: require('./assets/SourceSansPro-Regular.ttf'),
    SourceSansProBold: require('./assets/SourceSansPro-Bold.ttf')
  });
  // const { showModal } = useBottomModal()

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
      <BottomModalProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconSize = size;

                if (route.name === 'Dashboard') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Add') {
                  iconName = 'ios-add';
                  return (
                    <View style={{ position: 'relative', top: -10, borderRadius: 25, backgroundColor: '#1689fc', width: 50 }}>
                      <View style={{ left: '50%', top: '50%', transform: 'translate(-25%, -50%)' }}>
                        <Ionicons name={iconName} size={50} color='#FFF' />
                      </View>
                    </View>
                  );
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#1689fc',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen
              name="Add"
              component={HomeScreen}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </BottomModalProvider>
    </PaperProvider>
  );
}