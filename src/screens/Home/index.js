import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, Keyboard, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import Constants from 'expo-constants';

import Search from './components/Search';
import Welcome from './components/Welcome';
import ExpenseList from './components/ExpenseList';
import Overview from './components/Overview';

import { InvoiceContext } from '../../contexts/invoiceContext';
import generateDownloadFile from '../../utils/generateDownloadFile';
import splash from '../../../assets/splash.png'

const statusBarHeight = Constants.statusBarHeight;

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const navigation = useNavigation();
  const { invoiceContext } = useContext(InvoiceContext);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    const setSplashScreen = async () => {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setLoaded(true);
      }, 3000)
    }

    setSplashScreen()
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  const filterData = () => {
    return invoiceContext.filter(item => {
      if (!searchTerm) return true
      if (
        moment(item.date).format('MMMM').toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true
      }
    })
  }

  const runningTotal = filterData().reduce((a, b) => a + b.amount, 0);
  const taxRelief = (10 * (runningTotal) / 100).toLocaleString()

  if (!loaded) {
    return null;
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <View style={styles.root}>
        <View style={styles.header}>
          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </View>
        <View style={styles.welcome}>
          <Welcome />
        </View>
        <View style={styles.dashboard}>
          <Overview total={runningTotal} taxRelief={taxRelief} />
        </View>
        <View style={[styles.content, { flex: keyboardOpen ? 2 : 8}]}>
          <ExpenseList
            data={filterData()}
          />
        </View>
      </View>
      <FAB.Group
        open={open}
        icon={open ? 'close' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => navigation.navigate('AddExpense') },
          { icon: 'download', onPress: () => generateDownloadFile() },
        ]}
        onStateChange={onStateChange}
        fabStyle={styles.fab}
      />
    </KeyboardAvoidingView>
  </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#1689fc'
    // height: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: statusBarHeight,
  },
  dashboard: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: statusBarHeight,
  },
  welcome: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    // flex: 8,
    justifyContent: 'flex-start',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: '38%',
    bottom: -10,
    backgroundColor: '#1689fc'
  },
});

export default HomeScreen;
