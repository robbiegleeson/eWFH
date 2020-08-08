import React, { useState } from 'react';
import { View, ImageBackground, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../components/Header';
import { Appbar, RadioButton, Menu, Button, Text, FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

import { ELECTRIC_PROVIDERS_ENUM, TELECOM_PROVIDERS_ENUM, HEATING_PROVIDERS_ENUM} from '../../utils/providersEnum.js';
import AsyncStorage from '@react-native-community/async-storage';

function AddItem({ navigation }) {
  const [itemType, setItemType] = useState('utility');
  const [itemCategory, setItemCategory] = useState();
  const [provider, setProvider] = useState('');
  const [visible, setVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));

  const { root, colors, image } = useTheme();
  const monthList = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  const img = require('../../../assets/app-background.png');

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onProviderChange = (type) => {
    switch (type) {
      case 'telecoms':
        setProviders(TELECOM_PROVIDERS_ENUM);
        break;
      case 'electric':
        setProviders(ELECTRIC_PROVIDERS_ENUM);
        break;
      case 'heating':
        setProviders(HEATING_PROVIDERS_ENUM);
        break;
    
      default:
        break;
    }
  }

  const saveItem = async () => {
    if (itemType === 'utility') {
      let items = [{
        itemType,
        itemCategory,
        provider: selectedProvider,
        amount,
        description,
        selectedDate: moment().month(8),
        id: Math.random(),
      }];

      const monthIndex = monthList.findIndex(month => month.value === selectedMonth);
  
      const existingItemsJson = await AsyncStorage.getItem(`@${moment().month(monthIndex).format('MM-YYYY')}`);
      const existingItems = JSON.parse(existingItemsJson);
      items = [
        ...items,
        ...(existingItems || []),
      ];
      // setItems(items)
      const jsonValue = JSON.stringify(items);
  
      AsyncStorage.setItem(`@${moment().month(monthIndex).format('MM-YYYY')}`, jsonValue)
    } else {
      let items = [{
        itemType: value,
        amount,
        description,
        provider: 'Other',
        selectedDate: moment().month(8),
        id: Math.random(),
      }]

      const existingItemsJson = await AsyncStorage.getItem(`@${moment().month(monthIndex).format('MM-YYYY')}`);
        const existingItems = JSON.parse(existingItemsJson);
        items = [
          ...items,
          ...(existingItems || []),
        ];
    
        const jsonValue = JSON.stringify(items);
    
        AsyncStorage.setItem(`@${moment().month(monthIndex).format('MM-YYYY')}`, jsonValue).then(() => {
          Alert.alert(
            'Success',
            'All done here',
            [
              { text: 'OK', onPress: () => navigation.navigate('Home', { refresh: true, items }) }
            ],
            { cancelable: false }
          )
        })
    }
  }

  const container = {
    backgroundColor: "#FFF",
    padding: 20,
    width: '100%',
    borderRadius: 20,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5
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
        <Header
          leftAction={<Appbar.Action color="#FFF" icon="arrow-left" onPress={() => navigation.goBack()} />}
          rightAction={<FAB
            color="#FFF"
            style={{
              // position: 'absolute',
              // margin: 16,
              // right: -10,
              // top: Platform.OS === 'android' ? 30 : 20,
              elevation: 0,
              backgroundColor: 'transparent'
            }}
            icon="content-save"
            onPress={() => saveItem()}
          />}
          // rightAction={<Appbar.Action color={colors.white} icon="plus" onPress={() => navigation.navigate('AddItem')} />}
        />
        <View style={{ flex: 6, marginTop: 20 }}>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <View style={container}>
              <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Select Type</Text>
              <DropDownPicker
                zIndex={6000}
                items={[
                    {label: 'Utility', value: 'utility'},
                    {label: 'Expense', value: 'expense'},
                ]}
                defaultValue={itemType}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#FFF', borderRadius: 20
                // elevation: 5
              }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#FFF'}}
                onChangeItem={item => setItemType(item.value)}
              
              />
            </View>
            <View style={container}>
              <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Select Month</Text>
                <DropDownPicker
                zIndex={5000}
                  items={monthList}
                  defaultValue={selectedMonth}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#FFF', borderRadius: 20, shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    // elevation: 5
                  }}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#FFF'}}
                  onChangeItem={item => setSelectedMonth(item.value)}
                
                />
            </View>
            {itemType === 'utility' && (
              <>
              <View style={container}>
                <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Select Categoty</Text>
                <DropDownPicker
                zIndex={4000}
                  items={[
                      {label: 'Telecoms', value: 'telecoms'},
                      {label: 'Electric', value: 'electric'},
                      {label: 'Heating', value: 'heating'},
                  ]}
                  defaultValue={itemCategory}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#FFF', borderRadius: 20, shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    // elevation: 5
                  }}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#FFF'}}
                  onChangeItem={item => {
                    onProviderChange(item.value)
                    setItemCategory(item.value)}
                  }
                
                />
              </View>
              <View style={container}>
                <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Select Provider</Text>
                <DropDownPicker
                  zIndex={3000}
                  items={providers}
                  defaultValue={selectedProvider}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#FFF', borderRadius: 20, shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    // elevation: 5
                  }}
                  itemStyle={{
                      justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#FFF'}}
                  onChangeItem={item => {
                    console.log(item)
                    setSelectedProvider(item.value)}
                  }
                />
              </View>
              </>
            )}
            <View style={container}>
            <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Amount</Text>
            <TextInput
              defaultValue="€0.00"
              style={{ height: 40, borderRadius: 5, shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3.84,
                // elevation: 5,
                backgroundColor: '#FFF',
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: '#dfdfdf'
              }}
              keyboardType="phone-pad"
              onChangeText={text => setAmount(text)}
              value={amount}
            />
            </View>
            <View style={container}>
              <Text style={{ color: '#1689FC', paddingVertical: 10 }}>Description</Text>
              <TextInput
                multiline
                style={{ height: 100, borderRadius: 5, shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3.84,
                // elevation: 5,
                backgroundColor: '#FFF',
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: '#dfdfdf',
              }}
                onChangeText={text => setDescription(text)}
                value={description}
              />
            </View>
            </ScrollView>
            {/* <Button style={{ backgroundColor: 'rgb(22, 137, 252)' }} labelStyle={{ color: '#FFF' }} icon="content-save-settings" mode="contained" onPress={() => saveItem()}>
              Save
            </Button> */}
        </View>
      </ImageBackground>
    </View>
  );
}

export default AddItem;
