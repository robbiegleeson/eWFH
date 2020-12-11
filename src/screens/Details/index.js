import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Constants from 'expo-constants';

import { InvoiceContext } from '../../contexts/invoiceContext';

const statusBarHeight = Constants.statusBarHeight;

const Details = ({ route }) => {
  const [values, setValues] = useState([])
  const navigation = useNavigation();
  const { invoiceContext } = useContext(InvoiceContext);
  const { params: { item: { title, category, amount, date } } } = route;

  useEffect(() => {
    const providerEntries = invoiceContext
      .filter((invoice) => invoice.title.toLowerCase() === title.toLowerCase());
    
    const amounts = providerEntries.map((provider) => {
      return {
        y: provider.amount,
        x: moment(provider.date).format('DD/MM/YY')
      }
    });
    setValues(amounts)
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingTop: statusBarHeight }}>
        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#1689fc', marginBottom: 20 }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>{`€${(amount).toFixed(2)}`}</Text>
        <Text style={[styles.amount, { fontSize: 14, marginTop: 10 }]}>{`Tax Relief €${(10 * (amount) / 100).toFixed(2)}`}</Text>
        <Text style={styles.date}>{moment(date).format('DD/MM/YYYY')}</Text>
      </View>
      <View style={{ flex: 5, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
        <PureChart
          data={values}
          type='line'
          width={'100%'}
          height={200}
        />
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
  amount: {
    fontSize: 18,
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 10
  }
});

export default Details;
