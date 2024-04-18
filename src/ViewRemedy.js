import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

const Viewremedy = props => {
  const {name, id} = props.route.params;

  const data = [
    {
      id: '1',
      title: 'Hairfall Remedy',
      description: 'Makes Hairf strong and healthy',
      disease: 'for hairfall',
    },
    {
      id: '2',
      title: 'Stomach Pain Remedy',
      description: 'Remove Stomach pain',
      disease: 'for Stomach pain',
    },

    {
      id: '3',
      title: 'For Heart problem remedy ',
      description: 'Helps to control heart problem ',
      disease: 'for Heart problem',
    },
    {
      id: '4',
      title: 'For kidney stone remedy',
      description: 'Remove kidney stone ',
      disease: 'for kidney stone',
    },
    {
      id: '5',
      title: 'Diabetes Remedy',
      description: 'Helps to control Diabetes',
      disease: 'for Diabetes',
    },
  ];

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <ScrollView style={styles.scrollView}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => props.navigation.navigate('RemedyDesc')}
            style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
            <View style={styles.itemContent}>
              <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.disease}>{item.disease}</Text>
                <Text style={styles.disease}>Ranking will be shown here </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('AddProducts')}
                  style={{}}>
                  <Text
                    style={[
                      styles.AbuttonText,
                      {marginLeft: 250, marginTop: -90},
                    ]}>
                    See Comments & replies
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('AddProducts')}
                  style={{}}>
                  <Text
                    style={[
                      styles.AbuttonText,
                      {marginLeft: 250, marginTop: -20},
                    ]}>
                    Add Product
                  </Text>
                </TouchableOpacity>
                {/* <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.rating}
                  starSize={20}
                  fullStarColor={'gold'}
                  emptyStarColor={'gray'}
                /> */}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  AbuttonText: {
    color: 'blue',
    fontSize: 13,
  },
  searchInput: {
    backgroundColor: 'lightgrey',
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#00A040',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 5,
    color: 'grey',
    fontSize: 16,
  },
  disease: {
    color: 'grey',
    fontSize: 16,
  },
  showMoreButton: {
    backgroundColor: 'black',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  showMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Viewremedy;
