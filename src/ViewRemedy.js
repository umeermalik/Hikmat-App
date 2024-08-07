import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import Api from './Api';

const Viewremedy = props => {
  const {name, id} = props.route.params;
  const [namee, setames] = useState([]);

  //Api getremedy function
  const GetNuskha = async () => {
    try {
      const response = await fetch(`${Api}/Addnushka/GetAllRemedy?id=${id}`);
      const data = await response.json();
      console.log(data);
      setames(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    GetNuskha();
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('RemedyUpdateAndViewsite', {
          nushkaid: item.id,
        })
      }
      style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
      <View style={styles.itemContent}>
        <View style={styles.itemDetails}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>Hakeem: {name}</Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('comments', {Id: item.id, name, id})
            }
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>See Comments & Replies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AddProducts', {Id: item.id, name, id})
            }
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <FlatList
        data={namee}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  AbuttonText: {
    color: 'blue',
    fontSize: 13,
  },
});

export default Viewremedy;
