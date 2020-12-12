import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import Constants from 'expo-constants';

import Search from './components/Search';
import Welcome from './components/Welcome';
import ExpenseList from './components/ExpenseList';
import Overview from './components/Overview';

import { InvoiceContext } from '../../contexts/invoiceContext';

const statusBarHeight = Constants.statusBarHeight;

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState();
  const navigation = useNavigation();
  const { invoiceContext } = useContext(InvoiceContext);

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

  console.log(runningTotal)

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <Welcome />
        <Overview total={runningTotal} taxRelief={taxRelief} />
      </View>
      {/* <View style={styles.welcome}>
      </View>
      <View style={styles.dashboard}>
      </View> */}
      <View style={styles.content}>
        <ExpenseList
          data={filterData()}
        />
      </View>
      <FAB
        color='#FFF'
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
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
    justifyContent: 'center'
  },
  content: {
    flex: 2,
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
