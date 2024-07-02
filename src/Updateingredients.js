import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Api from './Api';

const Updateingredient = props => {
  const {r_id} = props.route.params;
  const [Ingredientdata, setdata] = useState([]);
  const [selectedid, setid] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngredientquantity, setNewIngredientquantity] = useState('');
  const [newIngredientunit, setNewIngredientunit] = useState('');

  const fetchData = async () => {
    try {
      const url = `${Api}/Addnushka/Getall?n_id=${r_id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setdata(data);
      console.log(Ingredientdata);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [r_id]);
  const addingnewdata = async () => {
    try {
      const url = `${Api}/Addnushka/UpdateIngredientquantity?i_id=${selectedid}&n_id=${r_id}`;
      const formData = new FormData();
      formData.append('quanity', newIngredientquantity);
      formData.append('unit', newIngredientunit);

      const response = await fetch(url, {
        method: 'put',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        console.log('misson complete');
        fetchData();
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Quantity: {item.quanity}</Text>
      <Text style={styles.itemText}>Unit: {item.unit}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: '45%',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setModalVisible(true);
            setid(item.id);
            console.log(selectedid, r_id, 'okay');
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Update Ingredient quanityt unit{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleUpdate = () => {
    // Implement the logic to update the ingredient name here
    // You can use newIngredientName state to get the new name entered in the TextInput
    // You may need to send a request to your API to update the ingredient name
    // After successful update, close the modal and refresh the data
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Ingredientdata}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={text => setNewIngredientquantity(text)}
              keyboardType="number-pad"
              value={newIngredientquantity}
              placeholder="Enter new ingredient quantity"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => setNewIngredientunit(text)}
              value={newIngredientunit}
              placeholder="Enter new ingredient unit"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'green'}]}
                onPress={addingnewdata}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'red'}]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Updateingredient;
