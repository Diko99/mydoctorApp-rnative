import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List, DoctorCategory} from '../../components';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';
import {colors} from '../../utils';
import {Firebase} from '../../config';

const ChooseDoctor = ({navigation, route}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callDoctorByCategory = category => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('category') //memanggil data category pada doctors difirebase
      .equalTo(category) //kemudian akan dimatching dengan parameters yg dikirimkan apakah data tsb sama atau tidaknya
      .once('value') //untuk 1x pemanggilan
      .then(res => {
        console.log('data listDoctor', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setListDoctor(data);
          console.log(data);
        }
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map(doctor => {
        return (
          <List
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
