import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsItem,
  Gap,
} from '../../components';
import {fonts, colors, showError} from '../../utils';
import {DummyDoctor3} from '../../assets';
import {Firebase} from '../../config';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, []);

  const getCategoryDoctor = () => {
    Firebase.database()
      .ref('category_doctor/')
      .once('value')
      .then(res => {
        console.log('get category_doctor success!', res.val());
        if (res.val()) {
          setCategoryDoctor(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getTopRatedDoctors = () => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data-parse :', data);
          setDoctors(data);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const getNews = () => {
    Firebase.database()
      .ref('/news/')
      .once('value')
      .then(res => {
        console.log('get news data form firebase success!', res.val());
        if (res.val()) {
          setNews(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* headers */}
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini ?
            </Text>
          </View>
          {/* contents category dokter */}
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          {/* contents  category news/dokter */}
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  avatar={{uri: doctor.data.photo}}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item, index) => {
            return (
              <NewsItem
                key={index}
                title={item.title}
                image={item.image}
                date={item.date}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

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
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  category: {
    flexDirection: 'row',
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
