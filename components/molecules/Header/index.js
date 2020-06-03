import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Button} from '../../atoms';
import {colors, fonts} from '../../../utils';
import DarkProfile from './DarkProfile';

const Header = ({title, onPress, type}) => {
  if (type === 'dark-profile') {
    return <DarkProfile onPress={onPress} />;
  }
  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
  text: type => ({
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    color: type === 'dark' ? colors.white : colors.text.primary,
    fontFamily: fonts.primary[600],
    textTransform: 'capitalize',
  }),
});
