import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import CustomDropdown from './custompicker';
import {RadioButton} from 'react-native-paper';
import Api from './Api';

const Addremedy = props => {
  const {id, name} = props.route.params;

  const [desase, setdeases] = useState([]);
  const [selecteddesase, setselecteddeases] = useState([]);
  const [remedy, setremedy] = useState('');
  const [publicity, setpublicity] = useState('');

  const handleGenderChange = value => {
    setpublicity(value);
  };

  const addingRemedy = async () => {
    try {
      const url = `${Api}/Addnushka/AddRemedy`;
      const formData = new FormData();
      formData.append('h_id', id);
      formData.append('name', remedy);
      formData.append('publicity', publicity);

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
          width="100%"
        />
        <TextInput
          style={styles.input}
          value={remedy}
          placeholder="Remedy Name"
          onChangeText={text => setremedy(text)}
        />
        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={handleGenderChange}
            value={publicity}>
            <View style={styles.radioOption}>
              <RadioButton value="public" />
              <Text style={styles.radioText}>Public</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="private" />
              <Text style={styles.radioText}>Private</Text>
            </View>
          </RadioButton.Group>
        </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00A040',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default Addremedy;
