import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomDropdown from './custompicker';

const Setttingup = props => {
  const [disease, setDisease] = useState([]); // Array for diseases
  const [selectedDisease, setSelectedDisease] = useState([]); // Array for selected diseases
  const [gender, setGender] = useState('Male'); // Default value for gender

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
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioContainer}>
            {/* Radio button for Male */}
            <View style={styles.radioButton}>
              <RadioButton
                value="Male"
                status={gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Male')}
                color="#00A040"
              />
              <Text style={styles.radioText}>Male</Text>
            </View>
            {/* Radio button for Female */}
            <View style={styles.radioButton}>
              <RadioButton
                value="Female"
                status={gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Female')}
                color="#00A040"
              />
              <Text style={styles.radioText}>Female</Text>
            </View>
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PatientHome')}
          style={styles.button}>
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
