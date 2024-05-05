import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Api from './Api';

const Steps = props => {
  const {r_id, id, name} = props.route.params;

  const [stepText, setStepText] = useState('');
  const [addedSteps, setAddedSteps] = useState([]);

  const handleAddStep = async () => {
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
        console.log('Step added:', data);

        // Update addedSteps state to include the new step
        setAddedSteps([...addedSteps, stepText]);

        // Clear input field after adding step
        setStepText('');
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const renderStepItem = ({item}) => (
    <View style={styles.stepItem}>
      <Text>{item}</Text>
    </View>
  );

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
        <FlatList
          data={addedSteps}
          renderItem={renderStepItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          contentContainerStyle={styles.stepList}
        />
        <TouchableOpacity onPress={handleAddStep} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Step</Text>
        </TouchableOpacity>
      </View>

      {/* Render added steps using FlatList */}

      {/* Reintegrate the "Done" button */}
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
    flexGrow: 1,
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
  stepList: {
    marginTop: 20,
  },
  stepItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
};

export default Steps;
