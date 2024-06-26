import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import Api from './Api';

const Steps = props => {
  const {r_id, id, name} = props.route.params;
  const [stepText, setStepText] = useState('');
  const [usage, setUsage] = useState('');
  const [addedSteps, setAddedSteps] = useState([]);

  const handleAddStep = async () => {
    try {
      const url = `${Api}/Addnushka/AddSteps`;
      const formData = new FormData();
      formData.append('steps', stepText);
      formData.append('usage', usage);
      formData.append('r_id', r_id);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Step added:', data);

        const newStep = {step: stepText, usage: usage};
        setAddedSteps([...addedSteps, newStep]);

        setStepText('');
        setUsage('');
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleAddUsage = async () => {
    try {
      const url = `${Api}/Addnushka/AddUsage`;
      const formData = new FormData();

      formData.append('usage', usage);
      formData.append('r_id', r_id);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usage added:', data);
        setUsage(data);
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
      <Text style={styles.stepText}>{item.step}</Text>
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

        <TouchableOpacity onPress={handleAddStep} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Step</Text>
        </TouchableOpacity>

        <FlatList
          data={addedSteps}
          renderItem={renderStepItem}
          keyExtractor={(item, index) => `${item.step}-${index}`}
          contentContainerStyle={styles.stepList}
        />

        <TextInput
          style={styles.input}
          placeholder="Add Usage"
          value={usage}
          onChangeText={text => setUsage(text)}
        />

        <TouchableOpacity onPress={handleAddUsage} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Usage</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Hakeem home', {id, name})}
        style={styles.doneButton}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    flexGrow: 1,
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00A040',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: '#e9ffe8',
  },
  stepText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Steps;
