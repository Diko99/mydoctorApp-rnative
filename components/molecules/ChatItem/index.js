import React from 'react';
import {StyleSheet} from 'react-native';
import {fonts, colors} from '../../../utils';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({isMe}) => {
  if (isMe) {
    return <IsMe />;
  }
  return <Other />;
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  chatContent: {
    maxWidth: '70%',
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
