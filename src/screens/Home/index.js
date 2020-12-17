import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FAB } from 'react-native-paper';
import moment from 'moment';
import * as SplashScreen from 'expo-splash-screen';

import Constants from 'expo-constants';

import Search from './components/Search';
import Welcome from './components/Welcome';
import ExpenseList from './components/ExpenseList';
import Overview from './components/Overview';

import { InvoiceContext } from '../../contexts/invoiceContext';
import generateDownloadFile from '../../utils/generateDownloadFile';
import { Modalize } from 'react-native-modalize';
import AddExpense from '../AddExpense';

const statusBarHeight = Constants.statusBarHeight;

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({ open: false });
  const [modalOpen, setModalOpen] = useState(false);

  const { invoiceContext } = useContext(InvoiceContext);

  const modalizeRef = useRef(null);

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync().then(() => {
        setLoaded(true);
      });
    }, 3000)
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  const onOpen = () => {
    modalizeRef.current?.open();
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
    modalizeRef.current?.close();
  }

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
      <Modalize
        onClosed={() => setModalOpen(false)}
        ref={modalizeRef}
      >
        <AddExpense closeModal={onClose} />
      </Modalize>
      {!modalOpen && (
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            { icon: 'plus', onPress: onOpen },
            { icon: 'download', onPress: () => generateDownloadFile() },
          ]}
          onStateChange={onStateChange}
          fabStyle={styles.fab}
        />
      )}
    </KeyboardAvoidingView>
  </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20
  },
  content: {
    justifyContent: 'flex-start',
  },
  fab: {
    bottom: -10,
    backgroundColor: '#1689fc'
  },
});

export default HomeScreen;
