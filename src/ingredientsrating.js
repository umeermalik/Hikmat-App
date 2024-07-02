import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Api from './Api';
import StarRating from 'react-native-star-rating';

const ingredientRating = props => {
  const {id, ingredientid} = props.route.params;
  console.log(id, ingredientid);
  const [Rate, setrating] = useState(0);
  const rateingredients = async () => {
    try {
      const url = `${Api}/Addnushka/AddingRating`;
      const formData = new FormData();
      formData.append('u_id', id);
      formData.append('ii_id', ingredientid);
      formData.append('rating', Rate);
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
        Alert.alert('Success', 'Rating ');
      } else {
        Alert.alert('Error', 'Failed to add rating .');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  return (
    <View>
      <Text style={styles.subHeading}>Ingredients Rating</Text>
      <StarRating
        selectedStar={setrating}
        disabled={false}
        maxStars={5}
        rating={Rate}
        starSize={25}
        fullStarColor={'gold'}
        emptyStarColor={'gray'}
      />
      <TouchableOpacity
        onPress={rateingredients}
        style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtons: {
    backgroundColor: '#00A040',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00A040',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButton: {
    width: 200,
    marginLeft: 150,
  },
  hakeemRatingText: {
    fontSize: 18,
    color: '#00A040',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#00A040',
  },
});
export default ingredientRating;
