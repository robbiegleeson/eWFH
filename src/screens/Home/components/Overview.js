import React from 'react';;
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import Counter from '../../../components/Counter';

const Overview = ({ total, taxRelief }) => {
  const { colors, shadow } = useTheme();

  return (
    <View style={[styles.container, { ...shadow }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontWeight: '200' }]}>
          <Text style={styles.smallText}>€</Text>
          <Counter>{total}</Counter>
        </Text>
        <Text style={styles.subtitle}>Total Expense</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.primary }]}>
          <Text style={styles.smallText}>€</Text>
          <Counter>{taxRelief}</Counter>
        </Text>
        <Text style={styles.subtitle}>Total Tax Relief</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  title: {
    fontSize: 32,
    color: '#484349',
    fontWeight: '500',
  },
  smallText: {
    fontSize: 20
  },
  subtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#484349',
  },
  divider: {
    width: 2,
    backgroundColor: '#eff0f4',
  }
});

export default Overview;
