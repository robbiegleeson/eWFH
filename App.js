import React from 'react';
import { StyleSheet, View, StatusBar, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerListItem, DrawerItem } from '@react-navigation/drawer';
import { Provider as PaperProvider, ActivityIndicator, Snackbar, List } from 'react-native-paper';
import { useFonts } from 'expo-font'

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

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerListItem {...props} />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
          labelStyle={{ color: '#FFF'}}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          // hideStatusBar
          drawerStyle={{
            // backgroundColor: '#c6cbef',
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60
          }}
          drawerContent={({ navigation }) => {
            return (
              <>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                  <View>
                    <Image source={require('./assets/drawerIcon.png')} />
                  </View>
                </View>
                <View style={{ flex: 3 }}>
                  <List.Item
                    title="Home"
                    left={props => <List.Icon {...props} color="#1689FC" size={10} icon={require('./assets/profileIcon.png')} />}
                    // right={props => <List.Icon {...props} icon={require('./assets/caret-right.png')}/>}
                    style={{ fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: '#1689FC'}}
                    onPress={() => navigation.navigate('Home')}
                  />
                  <List.Item
                    title="My Profile"
                    left={props => <List.Icon {...props} color="#1689FC" size={10} icon="settings" />}
                    // right={props => <List.Icon {...props} icon={require('./assets/caret-right.png')}/>}
                    style={{ fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: '#1689FC'}}
                    onPress={() => navigation.navigate('Profile')}
                  />
                  <List.Item
                    title="About"
                    left={props => <List.Icon {...props} color="#1689FC" size={10} icon="information" />}
                    // right={props => <List.Icon {...props} icon={require('./assets/caret-right.png')}/>}
                    style={{ fontSize: 16, borderBottomWidth: 0.5, borderBottomColor: '#1689FC'}}
                    onPress={() => navigation.navigate('About')}
                  />
                </View>
              </>
            )
          }}
        >
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
