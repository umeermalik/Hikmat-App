import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {RadioButton} from 'react-native-paper';
import Api from './Api'; // Import your API file here

const AddProducts = props => {
  const {Id, id, name} = props.route.params; // Destructure the ID from route params

  const [productname, setProductName] = useState('');
  const [price, setPrice] = useState('');
  // const [maxprice, setMaxPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [gender, setGender] = useState('');

  const [imgData, setImageData] = useState('');

  const chooseFile = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        // Image selected successfully
        setImageUri(response.uri);
        console.log(response);
        setImageData({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  const AddProduct = async () => {
    try {
      const url = `${Api}/Addnushka/AddProduct`;
      const formData = new FormData();
      formData.append('N_id', Id);
      formData.append('name', productname);
      formData.append('gender', gender);
      formData.append('price', price);
      formData.append('image', imgData);
      formData.append('h_id', id);
      console.log(formData);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        props.navigation.navigate('Hakeem home', {id, name});
        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleGenderChange = value => {
    setGender(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        value={productname}
        onChangeText={text => setProductName(text)}
        placeholder="Product Name"
        style={styles.input}
      />
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
          <View style={styles.radioOption}>
            <RadioButton value="Male" />
            <Text style={styles.radioText}>Male</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Female" />
            <Text style={styles.radioText}>Female</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Both" />
            <Text style={styles.radioText}>Both</Text>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        value={price}
        onChangeText={text => setPrice(text)}
        placeholder=" Price"
        style={styles.input}
        keyboardType="numeric"
      />
      {/* <TextInput
        value={maxprice}
        onChangeText={text => setMaxPrice(text)}
        placeholder="Max Price"
        style={styles.input}
        keyboardType="numeric"
      /> */}
      <TouchableOpacity style={styles.button} onPress={chooseFile}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </View>
      )}
      <Image
        source={{uri: imgData.uri}}
        height={200}
        width={200}
        style={{marginLeft: -20}}></Image>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#0073e6'}]}
        onPress={AddProduct}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
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
    marginRight: 5,
  },
  button: {
    backgroundColor: '#00A040',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
};

export default AddProducts;
