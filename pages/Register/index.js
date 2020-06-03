import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Input, Button, Gap} from '../../components';
import {colors, useForm, storeData, showError} from '../../utils';
import {Firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        Firebase.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data); //save data form variabel data to localstorage
        navigation.navigate('UploadPhoto', data); //if data success saved, continue to Page uploadPhoto
      })
      .catch(error => {
        showError(error.message);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            onChangeText={value => setForm('fullName', value)}
            value={form.fullName}
            label="Nama Lengkap"
          />
          <Gap height={20} />
          <Input
            onChangeText={value => setForm('profession', value)}
            value={form.profession}
            label="Pekerjaan"
          />
          <Gap height={20} />
          <Input
            onChangeText={value => setForm('email', value)}
            value={form.email}
            label="Email"
          />
          <Gap height={20} />
          <Input
            onChangeText={value => setForm('password', value)}
            value={form.password}
            label="Password"
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
