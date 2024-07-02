import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomDropdown from './custompicker';
import Api from './Api';

const Setttingup = props => {
  const {id} = props.route.params;

  const [disease, setDisease] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [datanushka, setdata] = useState({
    orderbynushka: [],
    orderbyhakem: [],
  });

  useEffect(() => {
    alldisease();
  }, []);

  const alldisease = async () => {
    try {
      const url = `${Api}/Addnushka/showAllDisease`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch diseases');
      }
      const data = await response.json();
      setDisease(data);
    } catch (error) {
      console.error('Error fetching diseases:', error.message);
      Alert.alert('Error', 'Failed to fetch diseases. Please try again.');
    }
  };

  const getNuskha = async () => {
    try {
      const diseaseIdString = selectedDisease.join(',');
      const url = `${Api}/Addnushka/SearchNushka?diseaseIds=${encodeURIComponent(
        diseaseIdString,
      )}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Nuskha data');
      }
      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
        const temp = datanushka;
        temp.orderbynushka = responseData;
        setdata(temp);
        Getorderhakeem();
      } else {
        Alert.alert('No Nuskha information found');
      }
    } catch (error) {
      console.error('Error fetching Nuskha:', error.message);
      Alert.alert('Error', 'Failed to fetch Nuskha data. Please try again.');
    }
  };

  const Getorderhakeem = async () => {
    try {
      const diseaseIdString = selectedDisease.join(',');
      const url = `${Api}/Addnushka/Searchhakeem?diseaseIds=${encodeURIComponent(
        diseaseIdString,
      )}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Hakeem data');
      }
      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
        const temp = datanushka;
        temp.orderbyhakem = responseData;
        setdata(temp);
        props.navigation.navigate('PatientHome', {data: datanushka, id});
      } else {
        Alert.alert('No Hakeem information found');
      }
    } catch (error) {
      console.error('Error fetching Hakeem:', error.message);
      Alert.alert('Error', 'Failed to fetch Hakeem data. Please try again.');
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

        {/* Done Button */}
        <TouchableOpacity onPress={getNuskha} style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
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
