import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDoctor2, DummyDoctor3, DummyDoctor1} from '../../assets';

const Messages = ({navigation}) => {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDoctor2,
      name: 'Alexander Jannie',
      desc: 'Baik ibu, terima kasih atas wakt....',
    },
    {
      id: 2,
      profile: DummyDoctor3,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak karena jeruk it....',
    },
    {
      id: 3,
      profile: DummyDoctor1,
      name: 'John McParker Steve',
      desc: 'Oke menurut pak dokter bagaimana unt....',
    },
  ]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => {
          return (
            <List
              key={doctor.id}
              {...doctor}
              onPress={() => navigation.navigate('Chatting')}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
