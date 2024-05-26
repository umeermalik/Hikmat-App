import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Api from './Api';

const Loginuser = props => {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    setLoading(true);
    try {
      const chk = `${Api}/Users/Loginn?email=${email}&password=${password}`;
      const response = await fetch(chk, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.rol == 'hakeem') {
        Alert.alert('Success');
        const {id, name} = data;
        console.log(id);
        props.navigation.navigate('Hakeem home', {name, id});
      } else if (data.rol == 'patient') {
        const {id} = data;
        console.log(id);
        props.navigation.navigate('SettingUp', {id});
      } else {
        Alert.alert('Error', 'Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../src/assets/SignupLogin.jpg')}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setemail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setpass(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handlelogin} style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Signup')}
        style={styles.loginLink}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginLink: {
    marginTop: 20,
  },
  linkText: {
    color: '#00A040',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#00A040',
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Loginuser;
