import React, {useState} from 'react';
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
import {RadioButton} from 'react-native-paper';

const PatienHome = props => {
  const {data, id} = props.route.params;
  console.log(data, 'okkk');
  const [filteredData, setFilteredData] = useState(data.orderbynushka);
  const [nuskaData, setNuskaData] = useState(data.orderbynushka);
  console.log(data);
  const [searchQuery, setSearchQuery] = useState('');
  const handleorder = value => {
    setorderview(value);
    if (value == 'Nushka') {
      setNuskaData(data.orderbynushka);
      setFilteredData(data.orderbynushka);
    } else {
      setNuskaData(data.orderbyhakem);
      setFilteredData(data.orderbyhakem);
    }
  };
  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(nuskaData); // If search query is empty, reset to original data
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = nuskaData.filter(
        item =>
          item.NuskhaName.toLowerCase().includes(lowercasedQuery) ||
          item.DiseaseName.toLowerCase().includes(lowercasedQuery) ||
          item.DiseaseTage.toLowerCase().includes(lowercasedQuery) ||
          item.HakeemName.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredData(filtered);
    }
  };
  const [Handleorder, setorderview] = useState('Nushka'); // Initialize with 'Nushka'

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
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <Text style={{marginLeft: '3%'}}>Order by</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleorder} value={Handleorder}>
          <View style={styles.radioOption}>
            <RadioButton value="Nushka" />
            <Text style={styles.radioText}> Nushka</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Hakeem" />
            <Text style={styles.radioText}> hakeem</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Open My Chats Button */}
      <TouchableOpacity
        style={styles.openChatsButton}
        onPress={() => props.navigation.navigate('Chatlist', {userid: id})}>
        <Text style={styles.openChatsButtonText}>Open My Chats</Text>
      </TouchableOpacity>

      {/* Content */}
      <FlatList
        style={styles.flatListContainer}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.remedyItemContainer}
            onPress={() =>
              props.navigation.navigate('Remedy', {
                Nuskhaid: item.Nuskhaid,
                Nuskhaname: item.NuskhaName,
                Hakeemid: item.hakeemid,
                hakeemUserId: item.hakeemUserId,
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
                Tags: {item.DiseaseTage}
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
              <View style={{marginLeft: '32%', marginTop: '-6%'}}>
                <Text>{item.RatingCount}</Text>
              </View>
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
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center', // Align items vertically
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 18,
    marginLeft: 5,
    color: '#333', // Color for radio button text
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00A040', // Border color for radio button
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00A040', // Background color when radio button is selected
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
  openChatsButton: {
    backgroundColor: '#00A040',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '5%',
  },
  openChatsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
