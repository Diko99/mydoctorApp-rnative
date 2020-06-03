import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Profile, Input, Button, Gap, Loading} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [passsword, setPasssword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDb] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    setLoading(true);
    if (passsword.length > 0) {
      if (passsword.length < 6) {
        setLoading(false);
        showMessage({
          message: 'Password harus lebih dari 6 karakter',
          type: 'default',
          color: colors.white,
          backgroundColor: colors.error,
        });
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };

  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user
          .updatePassword(passsword)
          .then(() => {})
          .catch(error => {
            showMessage({
              message: error.message,
              type: 'default',
              color: colors.white,
              backgroundColor: colors.error,
            });
          });
      }
    });
  };

  const updateProfileData = () => {
    //jika user tidak merubah password maka langsung redirect kefungsi ini
    const data = profile;
    data.photo = photoForDB; //merubah data photo menjadi bentuk string
    Firebase.database()
      .ref(`users/${profile.uid}/`) //reference/path yg ingin diupdate
      .update(data) //apa yang saya update ? (profile)
      .then(() => {
        setLoading(false);
        storeData('user', data); //saveto localStorage
        navigation.replace('MainApp');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        setLoading(false);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile, //mengcopy seluruh data lama yg ada pada profile
      [key]: value, //merubah key secara dinamis
    });
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200}, // set and desctruct Size image in small Size
      response => {
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Tidak jadi upload foto?',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          setPhotoForDb(`data:${response.type};base64, ${response.data}`);

          const source = {uri: response.uri};
          setPhoto(source);
        }
      },
    );
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Profile isRemove photo={photo} onPress={getImage} />
            <View style={styles.wrapperInput}>
              <Gap height={10} />
              <Input
                type="edit"
                value={profile.fullName}
                onChangeText={value => changeText('fullName', value)}
                label="Nama Lengkap"
              />
              <Gap height={10} />
              <Input
                type="edit"
                value={profile.profession}
                onChangeText={value => changeText('profession', value)}
                label="Pekerjaan"
              />
              <Gap height={10} />
              <Input type="edit" value={profile.email} label="Email" disable />
              <Gap height={10} />
              <Input
                type="edit"
                value={passsword}
                label="Password"
                onChangeText={value => setPasssword(value)}
                secureTextEntry
              />
              <Gap height={25} />
              <Button title="Save Profile" onPress={update} />
            </View>
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  wrapperInput: {
    marginTop: 20,
  },
});
