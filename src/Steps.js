import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import Api from './Api';

const Steps = props => {
  const {r_id, id, name} = props.route.params;

  const [stepText, setStepText] = useState('');

  const handleAddStep = () => {
    // Implement logic to handle adding step
    // For now, let's just log the step text
    console.log(stepText);
    setStepText(''); // Clearing input field after adding step
  };
  const addsteps = async () => {
    try {
      const url = `${Api}/Addnushka/AddSteps`;
      const formData = new FormData();
      formData.append('steps', stepText);
      formData.append('r_id', r_id);

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
        console.log('step added');
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Steps</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Step"
          value={stepText}
          onChangeText={text => setStepText(text)}
        />
        <TouchableOpacity onPress={addsteps} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Step</Text>
        </TouchableOpacity>
      </View>

      {/* Render added steps here */}
      {/* This section can be implemented to display the added steps */}

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Hakeem home', {id, name})}
        style={[styles.addButton, {marginTop: 20}]}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1, // Allowing container to grow in case of small content
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
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00A040',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default Steps;
