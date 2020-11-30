import React, { useState } from 'react';
import { View, Image, Text, Dimensions, SafeAreaView, SectionList, StyleSheet } from 'react-native';

import { useTheme, Searchbar, Headline, Divider } from 'react-native-paper';
import { useBottomModal } from 'react-native-bottom-modal';

import { StyledModal } from '../../../styled';
import { color } from 'react-native-reanimated';

function HomeScreen({ navigation, route }) {
  const { root, colors, shadow } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { showModal } = useBottomModal()

  const onChangeSearch = query => setSearchQuery(query)
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      
      if (route.name === 'Add') {
        showModal({
          height: Dimensions.get('screen').height / 1.1,
          content: (
            <StyledModal>
              <Headline>Hello</Headline>
            </StyledModal>
          ),
        })
      } else {
        navigation.navigate(route.name)
      }
    });
  
    return unsubscribe;
  }, [navigation]);

  const DATA = [
    {
      title: "January",
      data: [{
        title: 'eir',
        category: 'Telecommunications',
        amount: 65
      }, {
        title: 'Electric Ireland',
        category: 'Utility',
        amount: 202
      }]
    },
    {
      title: "Feburary",
      data: [{
        title: 'Calor Gas',
        category: 'Heating',
        amount: 716.58
      }, {
        title: 'Septic Tank',
        category: 'Other',
        amount: 150
      }, {
        title: 'eir',
        category: 'Telecommunications',
        amount: 68
      }]
    },
    {
      title: "March",
      data: [{
        title: 'eir',
        category: 'Telecommunications',
        amount: 65
      }, {
        title: 'Electric Ireland',
        category: 'Utility',
        amount: 202
      }]
    },
  ];

  const Item = ({ title: { title, category, amount } }) => {
    return (
      <View style={[styles.item]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary }} />
          </View>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={[styles.title, { fontSize: 14, fontWeight: '600' }]}>{title}</Text>
            <Text style={[styles.title, { fontSize: 10, fontStyle: 'italic' }]}>{category}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text style={[styles.title, { fontSize: 14, fontWeight: '600' }]}>{`€${amount}`}</Text>
          </View>
        </View>
        <Divider style={{ marginTop: 10 }} />
      </View>
    )
  };

  return (
    <View style={root}>



      <View style={{ flex: 3, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: colors.grey }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ borderRadius: 10, elevation: 0, height: 34 }}
          inputStyle={{ fontSize: 12 }}
        />
        <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Image source={require('../../../assets/cal-lg.png')} style={{ height: 45, width: 45, borderRadius: 22.5 }} />
          </View>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#484349' }}>Hi Rob,</Text>
            <Text style={{ fontSize: 12, color: '#484349' }}>Here's your e-Work from home summary</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 40, borderRadius: 10, ...shadow }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 32, color: '#484349' }}>108</Text>
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#484349' }}>Days WFH</Text>
          </View>
          <View style={{ width: 1, backgroundColor: colors.grey }}></View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 32, fontFamily: 'sans-serif', color: '#484349' }}><Text style={{ fontSize: 20 }}>€</Text>214.88</Text>
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#484349' }}>Total Tax Relief</Text>
          </View>
        </View>
      
      
      </View>



      <SafeAreaView style={{ flex: 4, backgroundColor: '#FFF', padding: 20 }}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item}
          renderItem={(item) => {
            console.log(item.item)
            return <Item title={item.item} />
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    paddingVertical: 10,
    fontSize: 12,
    color: '#1689fc',
  },
  header: {
    fontWeight: '800',
    color: '#484349'
  },
  title: {
    fontSize: 14,
  }
});

export default HomeScreen;
