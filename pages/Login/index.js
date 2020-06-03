import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ILLogo} from '../../assets';
import {Input, Link, Button, Gap} from '../../components';
import {colors, fonts, useForm, storeData, showError} from '../../utils';
import {Firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});
  const dispatch = useDispatch(); //merubah action/state pada redux
  const login = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Firebase.auth() //for authentication
      .signInWithEmailAndPassword(form.email, form.password) //login with email and password
      .then(res => {
        dispatch({type: 'SET_LOADING', value: false});
        Firebase.database() //get data from firebase match to data
          .ref(`users/${res.user.uid}/`) //references get data on database
          .once('value') //one time calling to databse
          .then(resDb => {
            storeData('user', resDb.val()); //save dataresult to localStorage
            navigation.replace('MainApp');
          })
          .catch(error => showError(error.message));
      })
      .catch(error => {
        showError(error.message);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <View style={styles.pages}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsulstasi</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry //hiden password
        />
        <Gap height={10} />
        <Link title="Forgot My Password" size={12} />
        <Gap height={30} />
        <Button title="Sign In" onPress={login} />
        <Gap height={20} />
        <Link
          title="Create New Account"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  pages: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
