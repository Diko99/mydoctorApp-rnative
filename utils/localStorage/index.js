import AsyncStorage from '@react-native-community/async-storage';

//menyimpan data dari localstorage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); //merubah data localstorage ke bentuk string
  } catch (error) {
    console.log(error);
  }
};

//mengambil data dari localstorage
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value); //merubah data localstorage ke bentuk object
    }
  } catch (e) {
    // saving error
  }
};
