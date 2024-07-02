import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from './Api';

const Addingredients = props => {
  var i_id;
  const {data, id, name} = props.route.params;
  var r_id = data;
  console.log(r_id, 'okay id');
  const [Publicity, setpublicity] = useState('');

  const [quantity, setquantity] = useState('');
  const [unit, setunit] = useState('');
  const [names, setname] = useState('');

  const handlePublicity = value => {
    setpublicity(value);
  };

  const AddingIngredient = async () => {
    try {
      const url = `${Api}/Addnushka/AddIngrdeients`;
      const formData = new FormData();
      formData.append('name', names);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        i_id = await response.json();
        console.log('Ingredient added successfully:', i_id);
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const addIngredientQuantity = async () => {
    try {
      const url = `${Api}/Addnushka/AddIngrdeintsquantity`;
      const formData = new FormData();
      formData.append('r_id', r_id);
      formData.append('i_id', i_id);
      formData.append('quantity', quantity);
      formData.append('unit', unit);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ingredient quantity added successfully:', data);
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleAddIngredient = () => {
    AddingIngredient()
      .then(() => addIngredientQuantity())
      .then(() => {
        console.log('Both operations completed successfully');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Ingredients</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingredient name"
          value={names}
          onChangeText={text => setname(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={text => setquantity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Unit"
          value={unit}
          onChangeText={text => setunit(text)}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('update', {r_id})}
          style={{width: '60%', marginLeft: '45%'}}>
          <Text
            style={{
              color: 'blue',
              fontSize: 13,
              textDecorationLine: 'underline',
            }}>
            click here to see all Ingredient
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
        <Text style={styles.buttonText}>Add Ingredient</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Steps', {r_id, id, name})}
        style={[styles.nextButton, {marginTop: 20}]}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00A040',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    height: 50,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00A040',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Addingredients;
