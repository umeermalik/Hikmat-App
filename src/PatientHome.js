import React from 'react';
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
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      />

      {/* Search Bar */}
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
              <Text style={styles.remedySubtitle}>
                Hakeem name: {item.HakeemName}
              </Text>
              <Text style={styles.remedySubtitle}>
                Nuskha: {item.NuskhaName}
              </Text>
              {/* Star Rating */}
              <StarRating
                disabled={false}
                maxStars={5}
                rating={item.AverageRating}
                starSize={20}
                fullStarColor={'#FFD700'}
                emptyStarColor={'#d3d3d3'}
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
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#00A040',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  remedyItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  remedyDetailsContainer: {
    flexDirection: 'column',
  },
  remedyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  remedySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  starContainer: {
    width: '50%',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
});

export default PatienHome;
