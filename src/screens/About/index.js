import React from 'react';
import { View, Text, ImageBackground, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Appbar, useTheme } from 'react-native-paper';
import { Link } from '@react-navigation/native';

function AboutScreen({ navigation }) {
  const { colors, root, image, shadow } = useTheme();
  const img = require('../../../assets/app-background.png');

  return (
    <View style={root}>
      <ImageBackground resizeMode="stretch" source={img} style={image}>
        <Header
          leftAction={<Appbar.Action color="#FFF" icon="arrow-left" onPress={() => navigation.goBack()} />}
        />
        <View style={{  flex: 4, backgroundColor: '#FFF', borderRadius: 20, marginHorizontal: 20, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ alignSelf: 'center', padding: 10, paddingLeft: 5, marginHorizontal: 20, fontFamily: 'SourceSansPro', fontSize: 20, color: '#1689FC' }}>About eWFH</Text>
            <Text style={{ fontFamily: 'SourceSansPro' }}>
              If you are working from home, you may be eligible for tax relief on expenses like light, heat, telephone and internet usage.
            </Text>
            <Text />
            <Text style={{ fontFamily: 'SourceSansPro' }}>
              If your employer <Text style={{ fontWeight: '800', fontStyle: 'italic', color: '#1689FC' }}>does not pay you an allowance for your expenses</Text>, you can make a claim for tax relief at the end of the year. You will get money back from the taxes you paid.
            </Text>
            <Text />
            <Text style={{ marginVertical: 10, color: '#1689FC' }}>How does it work?</Text>
            <Text style={{ fontFamily: 'SourceSansPro' }}>
             The eWFH follows guidelines for tax relief from Revenue and calculates your position tax relief for the year.
            </Text>
            <Text />
            <Text style={{ fontFamily: 'SourceSansPro' }}>
              Set the number of days you work from home each month in the year in your profile and the app will calculate the running total of possible tax relief. You can use this figure as a guideline for claiming end of year tax relief
            </Text>
            <Text />
            <Text style={{ marginVertical: 10, color: '#1689FC' }}>What Guidelines?</Text>
            <Text style={{ fontFamily: 'SourceSansPro' }}>
              Revenue are willing to accept that the average proportion household expenses that attributable to a home office is 10%. This along with the amount of days you work from home in the year will determine what tax relief you may be eligible for.
            </Text>
            <Text />
            <TouchableOpacity style={{ width: '100%' }}onPress={() => Linking.openURL('https://www.revenue.ie/en/employing-people/employee-expenses/e-working-and-home-workers/index.aspx')}>
              <Text>
                For more information check out <Text style={{ color: '#1689FC'}}>Revenue.ie</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

export default AboutScreen;
