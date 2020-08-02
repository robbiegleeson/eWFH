import React from 'react';
import { View, FlatList } from 'react-native';

import Header from '../../components/Header';
import DataCard from './components/DataCard/DataCard';
import SummaryCard from './components/SummaryCard/SummaryCard';
import { useTheme } from 'react-native-paper';

function HomeScreen({ navigation }) {
  const { root } = useTheme();

  return (
    <View style={root}>
      <Header title="Home" />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexGrow: 1 }}>
          <SummaryCard label="€70.00" rate="€3.20 / day" />
          <SummaryCard label="€79.00" rate="24% / month" />
        </View>
      </View>
      <View style={{ flex: 3, alignItems: 'center', padding: 10 }}>
        <FlatList
          style={{ width: '100%' }}
          data={[
            { key: '1', provider: 'Eir', type: 'invoice', amount: '65.00', calculatedTotal: '24.50' },
            { key: '2', provider: 'Electric Ireland', type: 'invoice', amount: '210.00', calculatedTotal: '54.50' },
            { key: '3', provider: 'Calor Gas', type: 'invoice', amount: '20.00', calculatedTotal: '52.50' }
          ]}
          renderItem={(item) => <DataCard provider={item.item.provider} amount={item.item.amount} calculatedTotal={item.item.calculatedTotal} />}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
