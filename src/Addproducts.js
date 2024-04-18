import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {RadioButton} from 'react-native-paper';

const AddProducts = props => {
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
      }
    });
  };

  const handleGenderChange = value => {
    setSelected(value);
  };

  const [imageUri, setImageUri] = useState('');
  const [gender, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput placeholder="Product Name" style={styles.input} />
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
      <TextInput placeholder="Min Price" style={styles.input} />
      <TextInput placeholder="Max Price" style={styles.input} />
      {/* <TextInput placeholder="Age" style={styles.input} /> */}
      <TouchableOpacity style={styles.button} onPress={chooseFile}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#0073e6'}]}
        onPress={chooseFile}>
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
