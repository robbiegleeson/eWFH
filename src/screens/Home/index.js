import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, SectionList } from 'react-native';

import Header from '../../components/Header';
import DataCard from './components/DataCard/DataCard';
import SummaryCard from './components/SummaryCard/SummaryCard';
import { useTheme, Appbar } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import saveItems from '../../utils/saveItem';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [isFetching, setIsFetching] = useState(true);
  const [userItems, setUserItems] = useState([]);
  const [calculatedUtilityTotals, setCalculatedTotal] = useState(0);
  const [key, setKey] = useState(`@${moment().year()}-data`)

  const { root, colors, image } = useTheme();

  const img = require('../../../assets/app-background.png');

  const fetchUserItems = async () => {
    setIsFetching(true);

    const allDataObj = await AsyncStorage.getItem(key);
    const data = JSON.parse(allDataObj);
    
    if (data) {
      setUserItems(data)
      const totals = data.map(d => d.data.map(i => i.amount));
      setCalculatedTotal(totals.flat().reduce((a, b) => Number(a) + Number(b), 0));
    } else {
      setUserItems([{ title: 'January', data: [] }, { title: 'Feburary', data: [] }, { title: 'March', data: [] }, { title: 'April', data: [] }, { title: 'May', data: [] }, { title: 'June', data: [] }, { title: 'July', data: [] }, { title: 'August', data: [] }, { title: 'September', data: [] }, { title: 'October', data: [] }, { title: 'November', data: [] }, { title: 'December', data: [] }]);
      setCalculatedTotal(0.00);
    }

    setIsFetching(false)
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUserItems();

      return () => {};
    }, [selectedDate, JSON.stringify(userItems)])
  );

  const removeBill = async (id) => {
    const updatedItems = userItems.filter(item => item.data = item.data.filter(d => d.id !== id));

    saveItems(key, updatedItems)
      .then(() => {
        setUserItems(updatedItems);
      })
      .catch(e => alert(e.message))
  }

  return (
    <View style={root}>
      <ImageBackground resizeMode="stretch" source={img} style={image}>
        <Header
          leftAction={<Appbar.Action color={colors.white} icon={require('../../../assets/menu.png')} onPress={() => navigation.openDrawer()} />}
          rightAction={<Appbar.Action color={colors.white} icon="plus" onPress={() => navigation.navigate('AddItem', { selectedDate })} />}
        />
        <View style={{  flex: 4 }}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <SummaryCard
              selectedDate={selectedDate}
              setSelectedDate={(date) => {
                setSelectedDate(date);
                setKey(`@${date.year()}-data`)
              }}
              value={calculatedUtilityTotals}
              key={key}
            />
          </View>
          <View style={{ flex: 2, paddingVertical: 20}}>
            <SectionList
              sections={userItems}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => <DataCard otherProvider={item.otherProvider} id={item.id} provider={item.provider} amount={item.amount} removeBill={removeBill} />}
              renderSectionHeader={({ section: { title } }) => (
                <LinearGradient colors={['rgb(129, 200, 238)', 'rgb(22, 137, 252)']} style={{ backgroundColor: '#FFF', flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 20, borderRadius: 10}}>
                  <Text style={{ color: '#FFF', paddingHorizontal: 20, paddingVertical: 10, fontSize: 18, }}>{title}</Text>
                </LinearGradient>
              )}
              renderSectionFooter={(item) => {
                if (!item.section.data.length) {
                  return (
                    <View style={{ alignItems: 'center', padding: 10 }}>
                      <Text>No Data</Text>
                    </View>
                  )
                }
              }}
              stickySectionHeadersEnabled
            />
          </View>
          
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;
