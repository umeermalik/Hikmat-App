import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import StarRating from 'react-native-star-rating';

const PatienHome = props => {
  const {data, id} = props.route.params;
  console.log(data);

  // Define images for the slider
  const images = [
    require('../src/assets/1600w-o3BuvnPgn2s.webp'),
    require('../src/assets/images.png'),
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Slider */}
      <SliderBox
        images={images}
        autoplay={true}
        circleLoop={true}
        autoPlayInterval={2000}
        dotColor="#00A040"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          paddingVertical: 10,
          width: '100%', // Full width pagination
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      />

      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/* Content */}
      <FlatList
        style={styles.flatListContainer}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.remedyItemContainer}
            onPress={() =>
              props.navigation.navigate('Remedy', {
                Nuskhaid: item.Nuskhaid,
                Nuskhaname: item.NuskhaName,
                id,
              })
            }>
            <View style={styles.remedyDetailsContainer}>
              <Text style={styles.remedyTitle}>
                Disease: {item.DiseaseName}
              </Text>
              <Text style={styles.remedyTitle}>
                Hakeem name: {item.hakeemname}
              </Text>
              <Text style={styles.remedyTitle}>Nuskha: {item.NuskhaName}</Text>
              {/* Star Rating */}
              <StarRating
                disabled={false}
                maxStars={5}
                rating={item.AverageRating}
                starSize={20}
                fullStarColor={'gold'}
                emptyStarColor={'gray'}
                containerStyle={styles.starContainer}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  header: {
    backgroundColor: '#00A040',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  flatListContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  remedyItemContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  remedyDetailsContainer: {
    flexDirection: 'column',
  },
  remedyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starContainer: {
    width: '50%',
    justifyContent: 'space-between',
  },
});

export default PatienHome;
