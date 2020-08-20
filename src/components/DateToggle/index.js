import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import moment from 'moment';

const DateToggle = ({ selectedDate, setSelectedDate }) => {
  const toggleDateBack = () => setSelectedDate(moment(selectedDate).subtract(1, 'year'));

  const toggleDateForward = () => setSelectedDate(moment(selectedDate).add(1, 'year'));

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => toggleDateBack()}>
            <Image source={require('../../../assets/caret-left.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image source={require('../../../assets/calendar.png')} style={{ height: 15, width: 15 }} />
          <Text style={{ color: '#1689FC', fontSize: 20, fontFamily: 'SourceSansPro', marginLeft: 10 }}>{selectedDate.format('YYYY')}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => toggleDateForward()}>
            <Image source={require('../../../assets/caret-right.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default DateToggle;
