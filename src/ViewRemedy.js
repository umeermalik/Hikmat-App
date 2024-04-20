import React, {useEffect, useState} from 'react';
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
import Api from './Api';

const Viewremedy = props => {
  const {name, id} = props.route.params;
  const [namee, setames] = useState([]);

  //Api getremedy fucntion
  const GetNuskha = async () => {
    try {
      var chk = `${Api}/Addnushka/GetAllRemedy?id=${id}`;
      const response = await fetch(chk);

      const data = await response.json();
      console.log('Response data:', data);
      setames(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  useEffect(() => {
    GetNuskha();
  }, []);
  // const data = [
  //   {
  //     id: '1',
  //     title: ,
  //     description: 'Makes Hairf strong and healthy',
  //     disease: 'for hairfall',
  //   },
  //   {
  //     id: '2',
  //     title: 'Stomach Pain Remedy',
  //     //Commit
  //     description: 'Remove Stomach pain',
  //     disease: 'for Stomach pain',
  //   },

  //   {
  //     id: '3',
  //     title: 'For Heart problem remedy ',
  //     description: 'Helps to control heart problem ',
  //     disease: 'for Heart problem',
  //   },
  //   {
  //     id: '4',
  //     title: 'For kidney stone remedy',
  //     description: 'Remove kidney stone ',
  //     disease: 'for kidney stone',
  //   },
  //   {
  //     id: '5',
  //     title: 'Diabetes Remedy',
  //     description: 'Helps to control Diabetes',
  //     disease: 'for Diabetes',
  //   },
  // ];
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('RemedyDesc')}
      style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
      <View style={styles.itemContent}>
        <View style={styles.itemDetails}>
          <Text>{item.name}</Text>
          <Text>{item.id}</Text>
          <Text>Hakeem:{name}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddProducts')}
            style={styles.buttonContainer}>
            <Text style={styles.AbuttonText}>See Comments & replies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AddProducts', {Id: item.id, name, id})
            }
            style={styles.buttonContainer}>
            <Text style={styles.AbuttonText}>Add Product</Text>
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
  );
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={namee}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
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
