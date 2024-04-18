import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import CustomDropdown from './custompicker';
import {Button} from 'react-native-paper'; // Removed unused RadioButton import
import Api from './Api';

const Addremedy = props => {
  const {id, name} = props.route.params;

  const [desase, setdeases] = useState([]);
  const [selecteddesase, setselecteddeases] = useState([]);
  const [remedy, setremedy] = useState('');

  const addingRemedy = async () => {
    var r_idd;
    try {
      const url = `${Api}/Addnushka/AddRemedy`;
      const formData = new FormData();
      formData.append('h_id', id);

      formData.append('name', remedy);
      console.log(formData);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        for (const selectedDisease of selecteddesase) {
          const url = `${Api}/Addnushka/AddNushkaData`;
          const formData = new FormData();
          formData.append('n_id', data);
          formData.append('d_id', selectedDisease);

          console.log(formData);

          const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
            props.navigation.navigate('Ingredients', {data});
          } else {
            console.log('Request failed with status:', response.status);
          }
        }

        console.log('Response data:', data);

        props.navigation.navigate('Ingredients', {data, id, name});
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    alldisease();
  }, []);

  const alldisease = async () => {
    try {
      const url = `${Api}/Addnushka/showAllDisease`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setdeases(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Remedy</Text>
      <View style={styles.inputContainer}>
        <CustomDropdown
          options={desase}
          selectedValues={selecteddesase}
          onValuesSelect={setselecteddeases}
          labelKey="name"
          valueKey="id"
          placeholder="Select Disease"
          height={350}
          width="70%"
        />
        <TextInput
          style={styles.input}
          value={remedy}
          placeholder="Remedy Name"
          onChangeText={text => setremedy(text)}
        />
        <TouchableOpacity onPress={addingRemedy} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Ingredients</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#00A040',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
};

export default Addremedy;
