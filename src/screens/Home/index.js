import React from 'react';
import { View, FlatList, ImageBackground, Image, Text, Platform } from 'react-native';

import Header from '../../components/Header';
import DataCard from './components/DataCard/DataCard';
import SummaryCard from './components/SummaryCard/SummaryCard';
import { useTheme, Appbar } from 'react-native-paper';

function HomeScreen({ navigation }) {
  const { root, colors, image } = useTheme();
  const img = require('../../../assets/app-background.png');

  return (
    <View style={root}>
      <ImageBackground resizeMode="stretch" source={img} style={image}>
        {/* <Header
          title="Home"
          leftAction={<Appbar.Action color={colors.white} icon="menu" onPress={() => navigation.openDrawer()} />}
          rightAction={<Appbar.Action color={colors.white} icon="plus" onPress={() => navigation.navigate('AddItem')} />}
        /> */}
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ position: 'absolute', left: 10, top: Platform.OS === 'android' ? 30 : 40 }}>
            <Appbar.Action color={colors.white} icon={require('../../../assets/menu.png')} onPress={() => navigation.openDrawer()} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../../../assets/cal-lg.png')} style={{ height: 45, width: 45 }} />
            <Text style={{ fontFamily: 'SourceSansPro', fontSize: 24, color: colors.white }}>eWFH</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ flexDirection: 'row', flex: 2, paddingHorizontal: 20 }}>
            {/* <Image source={require('../../../assets/cal-lg.png')} style={{ height: 45, width: 45 }} /> */}
            <SummaryCard label="€70.00" rate="@ 24.5%" />
            {/* <SummaryCard label="€79.00" rate="24% / month" /> */}
          </View>
        <View style={{ flex: 4, alignItems: 'center' }}>
          <FlatList
            style={{ width: '100%' }}
            data={[
              { key: '3', provider: 'Calor Gas', type: 'invoice', amount: '200.00', calculatedTotal: '52.50' },
              { key: '3', provider: 'Electric Ireland', type: 'invoice', amount: '210.00', calculatedTotal: '54.50' }
            ]}
            renderItem={(item) => <DataCard provider={item.item.provider} amount={item.item.amount} calculatedTotal={item.item.calculatedTotal} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;
