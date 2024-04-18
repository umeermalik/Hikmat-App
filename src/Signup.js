import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from './Api';

const Signup = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Hakeem');
  const handleValueChange = value => {
    setRole(value);
  };

  const AddingUser = async () => {
    try {
      const url = `${Api}/Users/UuserSignup`;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('rol', role);
      console.log(formData);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          // You might need to set other headers like Content-Type based on your server requirements
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        props.navigation.navigate('Login');
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to signup. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
          <View style={styles.radioOption}>
            <RadioButton value="Hakeem" />
            <Text style={styles.radioText}>Hakeem</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Patient" />
            <Text style={styles.radioText}>Patient</Text>
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity onPress={AddingUser} style={styles.signupButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={styles.loginLink}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00A040',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  signupButton: {
    backgroundColor: '#00A040',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 10,
  },
  linkText: {
    color: '#00A040',
    fontSize: 16,
  },
});

export default Signup;
