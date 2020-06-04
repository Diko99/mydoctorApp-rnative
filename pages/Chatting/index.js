import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, ChatItem, InputChat} from '../../components';
import {fonts, colors} from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';

const Chatting = ({navigation, route}) => {
  const dataDokter = route.params;
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDokter.data.fullName}
        desc={dataDokter.data.profession}
        photo={{uri: dataDokter.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Senin, 21 Maret, 2020</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>
      <InputChat
        value={'a'}
        onChangeText={() => alert('input diklik')}
        onButtonPress={() => {
          alert('klik button')
        }}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
});
