import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomDropdown from './custompicker';
import Api from './Api';

const Setttingup = props => {
  const {id} = props.route.params;
  // console.log(id);

  const [disease, setDisease] = useState([]); // Array for diseases
  const [selectedDisease, setSelectedDisease] = useState([]); // Array for selected diseases
  const [gender, setGender] = useState('Male'); // Default value for gender

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
      console.log(data);
      setDisease(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const getNuskha = async () => {
    try {
      const diseaseIdString = selectedDisease.join(',');
      console.warn(diseaseIdString);

      const url = `${Api}/Addnushka/SearchNushka?diseaseIds=${encodeURIComponent(
        diseaseIdString,
      )}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data'); // Handle non-200 response
      }

      const responseData = await response.json();

      if (responseData && responseData.length > 0) {
        // Navigate to PatientHome screen with the fetched data
        props.navigation.navigate('PatientHome', {data: responseData, id});
      } else {
        // Show alert if no data is returned
        Alert.alert('No information found');
        console.error('No information found');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 60}}>
        {/* Dropdown for selecting diseases */}
        <CustomDropdown
          options={disease}
          selectedValues={selectedDisease}
          onValuesSelect={setSelectedDisease}
          labelKey="name"
          valueKey="id"
          placeholder="Select Disease"
          height={350}
          width="100%"
        />

        {/* Gender selection */}

        {/* Done Button */}
        <TouchableOpacity onPress={getNuskha} style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  label: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    marginRight: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioText: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00A040',
    width: 200,
    height: 50,
    borderRadius: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
};

export default Setttingup;
