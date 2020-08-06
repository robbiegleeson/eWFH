import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../components/Header';
import { Appbar, RadioButton, TextInput, Menu, Button, Text } from 'react-native-paper';

function AboutScreen({ navigation }) {
  const [itemType, setItemType] = useState('utility');
  const [provider, setProvider] = useState('');
  const [visible, setVisible] = React.useState(false);
  const { root, colors } = useTheme();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={root}>
      <Header leftAction={<Appbar.Action color="#FFF" icon="arrow-left" onPress={() => navigation.goBack()} />} title="Add Item" />
      <View style={{ padding: 10 }}>
        <RadioButton.Group onValueChange={value => setItemType(value)} value={itemType}>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <View style={{ flex: 1, backgroundColor: colors.white }}>
              <Text>Utility</Text>
              <RadioButton color={colors.primary} value="utility" />
            </View>
            <View style={{ flex: 1 }}>
              <Text>Expense</Text>
              <RadioButton color={colors.primary} value="expense" />
            </View>
          </View>
        </RadioButton.Group>
        <TextInput
          style={{ width: '100%' }}
          label="Title"
          // value={text}
          // onChangeText={(text) => console.log('text')}
        />
        <TextInput
          style={{ width: '100%' }}
          label="Description"
          // value={text}
          // onChangeText={(text) => console.log('text')}
        />
        <Menu
          style={{ width: '94.5%' }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Select Provider</Button>}>
          <Menu.Item onPress={() => setProvider('Eir')} title="Eir" />
          <Menu.Item onPress={() => setProvider('Three')} title="Three" />
          <Menu.Item onPress={() => setProvider('Virgin Media')} title="Virgin Media" />
        </Menu>
        {provider ? <TextInput
          style={{ width: '100%' }}
          label="Provider"
          value={provider}
          disabled
          // onChangeText={(text) => console.log('text')}
        /> : <View />}
      </View>
    </View>
  );
}

export default AboutScreen;
