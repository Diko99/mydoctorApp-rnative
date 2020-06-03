import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    color: colors.white,
    backgroundColor: colors.error,
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    color: colors.white,
    backgroundColor: colors.primary,
  });
};
