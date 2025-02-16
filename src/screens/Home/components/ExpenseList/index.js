import React, { useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Animated } from 'react-native';
import moment from 'moment';
import { sortBy, reverse } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { InvoiceContext } from '../../../../contexts/invoiceContext';
import Counter from '../../../../components/Counter';


const Item = ({ title, category, amount, date, id, attachment }) => {
  const { deleteInvoiceContext } = useContext(InvoiceContext);

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.5, 0]
    })
    return (
      <>
        <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => deleteInvoiceContext(id)}>
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}>
              Delete
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </>
    )
   }

  return (
    <Swipeable renderRightActions={RightActions}>
      <TouchableOpacity>
        <View style={styles.item}>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.title, { fontSize: 14 }]}>{`€${(amount).toFixed(2)}`}</Text>
            <Text style={styles.category}>{category}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.date}>{moment(date).format('DD/MM/YYYY')}</Text>
              {attachment && (
                <IconButton
                  icon="attachment"
                  size={16}
                />
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text style={styles.title}><Counter>{(10 * (amount) / 100)}</Counter></Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
};

const ExpenseList = ({ data }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Item title={item.title} category={item.category} amount={item.amount} date={item.date} id={item.id} attachment={item?.attachment} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { borderTopRightRadius: 20, borderTopLeftRadius: 20 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.headingText}>Latest Items</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, alignItems: 'flex-end' }}>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={reverse(sortBy(data, (item) => item.date))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 20,
  },
  header: {
    // width: '180%',
    padding: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomColor: '#eff0f4',
    borderBottomWidth: 1,
  },
  headingText: {
  fontSize: 18,
  },
  item: {
    backgroundColor: '#fFFF',
    padding: 20,
    paddingVertical: 10,
    borderBottomColor: '#eff0f4',
    borderBottomWidth: 1,
    // marginVertical: 1,
    flexDirection: 'row',
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 20
  }
});

export default ExpenseList;
