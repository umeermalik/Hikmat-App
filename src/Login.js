import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import Api from './Api';

const Loginuser = props => {
  const [email, setemail] = useState();
  const [password, setpass] = useState();
  const handlelogin = async () => {
    try {
      var chk = `${Api}/Users/Loginn?email=${email}&password=${password}`;

      const response = await fetch(chk, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      //const hakeem = data.where(x=>x.rol == "hakeem").FirstorDefault();

      if (data.rol == 'hakeem') {
        Alert.alert('Success');

        id = data.id;
        name = data.name;
        console.log(id);
        props.navigation.navigate('Hakeem home', {name, id});
      } else if (data.rol == 'patient') {
        id = data.id;
        console.log(id);
        props.navigation.navigate('SettingUp', {id});
      } else {
        console.error('wrong info');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setpass(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handlelogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Signup')}
        style={styles.loginLink}>
        <Text style={styles.linkText}>Don't have an account?Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLink: {
    marginTop: 10,
  },
  linkText: {
    color: '#00A040',
    fontSize: 16,
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
    width: 300,
    height: 50,
    paddingHorizontal: 15,
    borderColor: 'black',
  },
  button: {
    backgroundColor: '#00A040',
    width: 250,
    height: 60,
    borderRadius: 28,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});

export default Loginuser;
