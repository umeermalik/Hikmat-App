import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from './Api';

const Addingredients = props => {
  var i_id;
  const {data, id, name} = props.route.params;
  var r_id = data;
  const [Publicity, setpublicity] = useState('');

  const [quantity, setquantity] = useState();
  const [unit, setunit] = useState();
  const [names, setname] = useState();

  const handlePublicity = value => {
    setpublicity(value);
  };

  const AddingIngredient = async () => {
    try {
      const url = `${Api}/Addnushka/AddIngrdeients`;
      const formData = new FormData();
      formData.append('name', names); // Assuming ingredientname is defined somewhere in your component

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          // Add any additional headers if needed
        },
      });

      if (response.ok) {
        i_id = await response.json();
        console.log('Ingredient added successfully:', i_id);
        // Call the function to add ingredient quantity
        // Pass the ingredient ID returned from the response
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
          // Add any additional headers if needed
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
      .then(ingredientId => {
        return addIngredientQuantity(ingredientId);
      })
      .then(() => {
        // Handle success if needed
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
          placeholder="Add ingredient"
          value={names}
          onChangeText={text => setname(text)}
        />
        {/* <TouchableOpacity style={styles.addButton} onPress={AddingIngredient}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add quantity"
          value={quantity}
          onChangeText={text => setquantity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Add unit"
          value={unit}
          onChangeText={text => setunit(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddIngredient}>
          <Text style={styles.buttonText}>Add Quantity</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Steps', {r_id, id, name})}
        style={[styles.addButton, {marginTop: 20}]}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00A040',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    height: 50,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 18,
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#00A040',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
};

export default Addingredients;
