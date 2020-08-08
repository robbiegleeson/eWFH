import React, { useState, useEffect } from 'react';
import { View, FlatList, ImageBackground, Image, Text, Platform } from 'react-native';

import Header from '../../components/Header';
import DataCard from './components/DataCard/DataCard';
import SummaryCard from './components/SummaryCard/SummaryCard';
import { useTheme, ActivityIndicator, Appbar } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { calculateTaxRelief } from '../../utils/calculateTaxRelief';
import saveItems from '../../utils/saveItem';

function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [isFetching, setIsFetching] = useState(true);
  const [userItems, setUserItems] = useState([]);
  const [userSettings, setUserSettings] = useState([]);
  const { root, colors, image } = useTheme();

  const img = require('../../../assets/app-background.png');

  useEffect(() => {
    const fetchUserSettings = async () => {
      setIsFetching(true)
      const valueString = await AsyncStorage.getItem('@userSettings');
      const value = JSON.parse(valueString);

      if (value) {
        setUserSettings(value);
      }
    }

    fetchUserSettings();
  }, []);

  useEffect(() => {
    const fetchUserItems = async () => {
      setIsFetching(true)
      const valueString = await AsyncStorage.getItem(`@${selectedDate.format('MM-YYYY')}`);
      const value = JSON.parse(valueString);

      if (value) {
        const parsedWithTotals = (value || []).map(item => {
          return {
            ...item,
            calculatedTotal: item.itemType === 1 ? calculateTaxRelief(selectedMonth, userSettings, item.amount) : (Number(item.amount) * 12.5 / 100).toFixed(2),
          }
        })

        setUserItems(parsedWithTotals);
      } else {
        setUserItems([]);
      }

      setIsFetching(false)
    }

    fetchUserItems();
  }, [selectedDate]);

  const removeBill = (id) => {
    const updatedItems = userItems.filter(item => item.id !== id);
    saveItems(8, updatedItems)
      .then(() => {
        setUserItems(updatedItems);
      })
      .catch(e => alert(e.message))
  }

  const calculatedTotalList = (userItems || []).map(item => item.calculatedTotal ?? 0);

  return (
    <View style={root}>
      <ImageBackground resizeMode="stretch" source={img} style={image}>
        <Header
          leftAction={<Appbar.Action color={colors.white} icon={require('../../../assets/menu.png')} onPress={() => navigation.openDrawer()} />}
          rightAction={<Appbar.Action color={colors.white} icon="plus" onPress={() => navigation.navigate('AddItem')} />}
        />
        <View style={{ flexDirection: 'row', flex: 2, paddingHorizontal: 20 }}>
          <SummaryCard
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            label={isFetching ? 0.00 : `€${calculatedTotalList.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2)}`}
            rate="@ 24.5%"
          />
        </View>
        {isFetching ? (
          <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating />
          </View>
        ) : (
          <View style={{ flex: 4, alignItems: 'center' }}>
          <FlatList
            style={{ width: '100%' }}
            data={userItems}
            renderItem={(item) => <DataCard id={item.item.id} provider={item.item.provider} amount={item.item.amount} calculatedTotal={item.item.calculatedTotal} removeBill={removeBill} />}
          />
        </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;
