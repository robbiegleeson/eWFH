import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button, TextInput, Chip, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { InvoiceContext } from '../contexts/invoiceContext';

const statusBarHeight = Constants.statusBarHeight;

const AddExpense = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [fileData, setFileData] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [errors, setErrors] = useState();

  const navigation = useNavigation();

  const { addInvoiceContext } = useContext(InvoiceContext);

  useEffect(() => {
    const getLocalData = async () => {
      const categories = await AsyncStorage.getItem(`@categories`);
      const providers = await AsyncStorage.getItem(`@providers`);
      
      const categoriesParsed = JSON.parse(categories);
      const providersParsed = JSON.parse(providers);

      if (categoriesParsed) {
        setCategories(categoriesParsed);
      }

      if (providersParsed) {
        setProviders(providersParsed);
      }
    }

    getLocalData();
  }, []);

  const onSubmit = async () => {
    const reg = /^[0-9]+([,.][0-9]+)?$/g;

    if (text === '') {
      return setErrors({
        provider: `Provider must not be empty`,
        ...errors,
      });
    }

    if (category === '') {
      return setErrors({
        category: `Category must not be empty`,
        ...errors,
      });
    }

    if (!reg.test(amount)) {
      return setErrors({
        amount: `Amount must only contain numbers`,
        ...errors,
      });
    }

    addInvoiceContext({
      title: text,
      category,
      amount: Number(amount),
      date: date,
      attachment: fileData,
    });

    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];

      await AsyncStorage.setItem('@categories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
    }

    if (!providers.includes(text)) {
      const updatedProviders = [...providers, text];

      await AsyncStorage.setItem('@providers', JSON.stringify(updatedProviders));
      setProviders(updatedProviders);
    }

    navigation.navigate('HomePage');
  };

  const handleFileUpload = () => {
    DocumentPicker.getDocumentAsync()
      .then((resp) => {
        if (resp.type === 'success') {
          setFileData({
            name: resp.name,
            uri: resp.uri,
          });
        }
      })
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const getChips = (array, match, action) => {
    if (!match && array.length >= 0) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {
            array.filter((type) => !type.toLowerCase().includes(match.toLowerCase))
            .map((item) => (
              <Chip
                key={Math.random()}
                onPress={() => action(item)}
                style={styles.chip}
              >
                {item}
              </Chip>
            ))
          }
        </View>
      )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: statusBarHeight }}>
        <Text>New Expense</Text>
      </View>
      <View style={{ flex: 9, backgroundColor: '#FFF' }}>
        <TextInput
          label="Provider"
          value={text}
          onChangeText={text => setText(text)}
          style={styles.textInput}
          underlineColor="#eff0f4"
        />
        {errors?.provider && (
          <HelperText type="error" visible={true}>
            Please specify a provider
          </HelperText>
        )}
        {getChips(providers, text, setText)}
        <TextInput
          label="Category"
          value={category}
          onChangeText={text => setCategory(text)}
          style={styles.textInput}
          underlineColor="#eff0f4"
        />
        {errors?.category && (
          <HelperText type="error" visible={true}>
            Please specify a category
          </HelperText>
        )}
        {getChips(categories, category, setCategory)}
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={text => setAmount(text)}
          style={styles.textInput}
          underlineColor="#eff0f4"
        />
        {errors?.amount && (
          <HelperText type="error" visible={true}>
            Amount must be a number
          </HelperText>
        )}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.button}>
            <Text style={{ color: 'grey' }}>{moment(date).format('DD/MM/YYYY')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFileUpload}>
          <View style={styles.button}>
            <Text style={{ color: 'grey' }}>{fileData ? fileData.name : '+ Add Attachment'}</Text>
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
          <Button
            style={{ flex: 1, marginHorizontal: 5, borderRadius: 10 }}
            mode="contained"
            onPress={() => navigation.navigate('HomePage')}
          >
            Cancel
          </Button>
          <Button
            style={{ flex: 1, marginHorizontal: 5, borderRadius: 10 }}
            mode="contained"
            onPress={onSubmit}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: 24,
    height: 64,
    borderBottomColor: '#eff0f4',
    borderBottomWidth: 1
  },
  textInput: {
    backgroundColor: '#FFF',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eff0f4',
  },
  chip: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 'auto', 
    alignSelf: 'flex-start',
  }
});

export default AddExpense;
