import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Profile = ({onPress, type, name, desc, isRemove, photo}) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile(type)}>
          <Image source={photo} style={styles.avatar(type)} />
          {!isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile(type)} onPress={onPress}>
          <Image source={photo} style={styles.avatar(type)} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  borderProfile: type => ({
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border,
  }),
  avatar: type => ({
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  }),
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textTransform: 'capitalize',
  },
  profession: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.primary[600],
    marginTop: 2,
    textTransform: 'capitalize',
  },
  removePhoto: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
