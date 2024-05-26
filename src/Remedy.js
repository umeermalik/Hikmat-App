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
} from 'react-native';
import Api from './Api';
import StarRating from 'react-native-star-rating';

const Remedy = props => {
  const {id, Nuskhaid, Nuskhaname} = props.route.params;
  const [rating, setRating] = useState(3);
  const [steps, setSteps] = useState([]);
  const [comment, setComment] = useState('');
  const [usage, setUsage] = useState([]);
  const [ingredientDetail, setIngredientDetail] = useState([]);

  const Ratingcomments = async () => {
    try {
      const url = `${Api}/Addnushka/ratingcomments`;
      const formData = new FormData();
      formData.append('n_id', Nuskhaid);
      formData.append('u_id', id);
      formData.append('rating', rating);
      formData.append('comments', comment);

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
        Alert.alert('Success', 'Rating and comments added successfully');
      } else {
        Alert.alert('Error', 'Failed to add rating and comments.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getSteps = async () => {
    try {
      const url = `${Api}/Addnushka/GetSteps?Nuskaid=${Nuskhaid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSteps(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getIngredients = async () => {
    try {
      const url = `${Api}/Addnushka/GetIngredients?Nuskaid=${Nuskhaid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setIngredientDetail(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const getUsage = async () => {
    try {
      const url = `${Api}/Addnushka/Getusage?Nuskaid=${Nuskhaid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsage(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getSteps();
    getIngredients();
    getUsage();
  }, []);

  const renderStepItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.Nuskhasteps}</Text>
    </View>
  );

  const renderIngredientItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>
        {item.IngredientName} ({item.ingredientquantity} {item.ingredientunit})
      </Text>
    </View>
  );

  const renderUsageItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.Nuskhausage}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{Nuskhaname}</Text>

      <View style={styles.divider} />

      <Text style={styles.subHeading}>Ingredients</Text>
      <FlatList
        data={ingredientDetail}
        renderItem={renderIngredientItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.divider} />

      <Text style={styles.subHeading}>Steps</Text>
      <FlatList
        data={steps}
        renderItem={renderStepItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.divider} />

      <Text style={styles.subHeading}>Usage</Text>
      <FlatList
        data={usage}
        renderItem={renderUsageItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.divider} />

      <Text style={styles.subHeading}>Rating</Text>
      <StarRating
        selectedStar={setRating}
        disabled={false}
        maxStars={5}
        rating={rating}
        starSize={30}
        fullStarColor={'gold'}
        emptyStarColor={'gray'}
      />

      <View style={styles.divider} />

      <View style={styles.inputContainer}>
        <TextInput
          value={comment}
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor="gray"
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={Ratingcomments} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Forums', {Nuskhaid, id})}
        style={styles.button}>
        <Text style={styles.buttonText}>See Comments & Replies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProductDescription', {Nuskhaid})
        }
        style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>See Products</Text>
      </TouchableOpacity>
    </ScrollView>
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
  submitButton: {
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
});

export default Remedy;
