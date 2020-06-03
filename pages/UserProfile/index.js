import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Profile, List, Gap, Loading} from '../../components';
import {colors, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const signOut = () => {
    setLoading(true);
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.replace('GetStarted');
        setLoading(false);
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'default',
          color: colors.white,
          backgroundColor: colors.error,
        });
        setLoading(false);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header title="Profile" onPress={() => navigation.goBack()} />
        <Gap height={10} />
        {profile.fullName.length > 0 && (
          <Profile
            name={profile.fullName}
            desc={profile.profession}
            photo={profile.photo}
          />
        )}
        <Gap height={16} />
        <List
          name="Edit Profile"
          desc="Last Update Yesterday"
          type="next"
          icon="edit-profile"
          onPress={() => navigation.navigate('UpdateProfile')}
        />
        <List
          name="Language"
          desc="Last Update Yesterday"
          type="next"
          icon="language"
        />
        <List
          name="Give Us Rates"
          desc="Last Update Yesterday"
          type="next"
          icon="rate"
        />
        <List
          name="Sign Out"
          desc="Last Update Yesterday"
          type="next"
          icon="help"
          onPress={signOut}
        />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
