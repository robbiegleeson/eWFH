import React, { useState } from 'react';
import { View, ImageBackground, TextInput, ScrollView, Alert, ActivityIndicator, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Header from '../../components/Header';
import { Appbar, Text, Button, useTheme, Portal, Dialog, Snackbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ELECTRIC_PROVIDERS_ENUM, TELECOM_PROVIDERS_ENUM, HEATING_PROVIDERS_ENUM, ALL_PROVIDERS } from '../../utils/providersEnum.js';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

function AddItem({ navigation, route }) {
  const [itemType, setItemType] = useState('utility');
  const [itemCategory, setItemCategory] = useState();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState();
  const [otherProvider, setOtherProvider] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [userSettings, setUserSettings] = useState();
  const [isLoading, setIsLoading] = useState(true);  
  const [selectedDate, setSelectedDate] = useState(route?.params?.selectedDate ?? moment());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { shadow } = useTheme();

  const getUserSettings = async () => {
    setIsLoading(true);
    const settings = await AsyncStorage.getItem('@userSettings');
    const settingsParsed = JSON.parse(settings);
    setUserSettings(settingsParsed);
    setIsLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      getUserSettings();

      return () => {};
    }, [])
  );

  const img = require('../../../assets/app-background.png');

  const saveItem = async () => {

    if (selectedProvider === 'Other' && !otherProvider) {
      setErrorMessage('Please enter title for other provider');
      return setIsModalOpen(true)
    }

    if (!selectedProvider && !otherProvider) {
      setErrorMessage('Please select a provider');
      return setIsModalOpen(true)
    }

    if (!amount || amount === '0') {
      setErrorMessage('Please enter an amount');
      return setIsModalOpen(true)
    }
    
    const newEntry = {
      provider: selectedProvider,
      amount,
      id: Math.random(),
      description,
      date: selectedDate,
      otherProvider
    }

    const key = `@${moment(selectedDate).year()}-data`;
    const yearData = await AsyncStorage.getItem(key);

    const yearDataParsed = JSON.parse(yearData) ?? [{ title: 'January', data: [] }, { title: 'Feburary', data: [] }, { title: 'March', data: [] }, { title: 'April', data: [] }, { title: 'May', data: [] }, { title: 'June', data: [] }, { title: 'July', data: [] }, { title: 'August', data: [] }, { title: 'September', data: [] }, { title: 'October', data: [] }, { title: 'November', data: [] }, { title: 'December', data: [] }];

    yearDataParsed[moment(selectedDate).month()].data.push(newEntry);

    AsyncStorage.setItem(key, JSON.stringify(yearDataParsed))
      .then(() => {
        clearForm();
        setIsSuccessModalOpen(true);
        navigation.navigate('Home');
      });
  }

  const clearForm = () => {
    setItemType('utility');
    setItemCategory(null);
    setProviders([]);
    setSelectedProvider(null);
    setAmount(null);
    setDescription(null);
    setOtherProvider(null)
  }

  const onDateChange = (event, date) => {
    const currentDate = date || selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  if (isLoading) {
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
    <View style={{
      position: 'absolute',
      top: 0, 
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'transparent',
    }}>
      <ImageBackground resizeMode="stretch" source={img} style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      }}>
        <Portal>
          <Snackbar
            theme={{ colors: { accent: '#FFF' }}}
            style={{ backgroundColor: '#1689FC'}}
            visible={isModalOpen}
            onDismiss={() => setIsModalOpen(false)}
            action={{
              label: 'Ok!',
              onPress: () => {
                setIsModalOpen(false);
              },
            }}>
            {errorMessage}
          </Snackbar>
          <Snackbar
            theme={{ colors: { accent: '#FFF' }}}
            style={{ backgroundColor: '#1689FC'}}
            visible={isSuccessModalOpen}
            onDismiss={() => setIsSuccessModalOpen(false)}
            action={{
              label: 'Done!',
              onPress: () => {
                setIsSuccessModalOpen(false);
              },
            }}>
            Expense added!
          </Snackbar>
        </Portal>
        <Header
          leftAction={<Appbar.Action color="#FFF" icon="arrow-left" onPress={() => navigation.goBack()} />}
        />
        {/* <View style={{  flex: 4 }}> */}
          {/* <Text style={{ color: '#1689FC', marginVertical: 10 }}>Select Month</Text> */}
            <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 20, padding: 20, flex: 3,  ...shadow }}>
              <KeyboardAvoidingView>
              <Text style={{ color: '#1689FC', fontFamily: 'SourceSansPro' }}>Select Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, padding: 10, paddingLeft: 0, borderColor: '#1689FC' }}>
                  <View>
                    <Image source={require('../../../assets/calendar.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'SourceSansPro' }}>{moment(selectedDate).format('MMMM YYYY')}</Text>
                  </View>
                </View>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(selectedDate)}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
                )}
                
              {itemType === 'utility' && (
                <>
                  <Text style={{ color: '#1689FC', marginTop: 10, fontFamily: 'SourceSansPro' }}>Select Provider</Text>
                  <DropDownPicker
                    zIndex={3000}
                    items={ALL_PROVIDERS}
                    defaultValue={selectedProvider}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#FFF', borderRadius: 20, borderWidth: 0, borderBottomWidth: 0.5, borderColor: '#1689FC', paddingLeft: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start', fontFamily: 'SourceSansPro'
                    }}
                    dropDownStyle={{backgroundColor: '#FFF' }}
                    onChangeItem={item => {
                      setSelectedProvider(item.value)}
                    }
                  />
                </>
              )}
              {selectedProvider === 'Other' && (
                <>
                  <Text style={{ color: '#1689FC', marginTop: 10, fontFamily: 'SourceSansPro' }}>Other Title</Text>
                  <TextInput
                    placeholder="Name of other expense"
                    style={{fontFamily: 'SourceSansPro', height: 40, paddingVertical: 5, backgroundColor: '#FFF', borderRadius: 5, borderColor: '#1689FC', borderWidth: 0, borderBottomWidth: 0.5 }}
                    onChangeText={text => setOtherProvider(text)}
                    value={otherProvider}
                  />
                </>
              )}
              <Text style={{ color: '#1689FC', marginTop: 10, fontFamily: 'SourceSansPro' }}>Amount</Text>
              <TextInput
                placeholder="€0.00"
                style={{fontFamily: 'SourceSansPro', height: 40, paddingVertical: 5, backgroundColor: '#FFF', borderRadius: 5, borderColor: '#1689FC', borderWidth: 0, borderBottomWidth: 0.5 }}
                keyboardType="phone-pad"
                onChangeText={text => setAmount(text)}
                value={amount}
              />
              {/* <Text style={{ color: '#1689FC', marginVertical: 10, fontFamily: 'SourceSansPro' }}>Description</Text>
              <TextInput
                multiline
                // style={{ paddingLeft: 20, height: 60, backgroundColor: '#FFF', borderRadius: 20, borderColor: '#dfdfdf'}}
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ fontFamily: 'SourceSansPro', height: 150, paddingVertical: 5, backgroundColor: '#FFF', borderRadius: 5, borderColor: '#1689FC', borderWidth: 0.5, borderBottomWidth: 0.5 }}
              /> */}
              </KeyboardAvoidingView>
            </View>
            <View style={{ flex: 1}}>
              <View style={{ padding: 20, position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                <Button style={{ borderRadius: 20, backgroundColor: 'rgb(22, 137, 252)', paddingVertical: 5 }} labelStyle={{ color: '#FFF' }} icon="content-save-settings" mode="contained" onPress={() => saveItem()}>
                  Save
                </Button>
              </View>
            </View>
        {/* </View> */}
      </ImageBackground>
    </View>
  );
}

export default AddItem;
