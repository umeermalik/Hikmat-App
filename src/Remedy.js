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
  console.log(id, Nuskhaid, Nuskhaname);
  const [rating, setRating] = useState(3);
  const [steps, setSteps] = useState([]);
  const [comment, setcomment] = useState();
  const [ingredientDetail, setIngredientDetail] = useState([]);

  const Ratingcomments = async () => {
    try {
      const url = `${Api}/Addnushka/ratingcomments`;
      const formData = new FormData();
      formData.append('n_id', Nuskhaid);
      formData.append('u_id', id);
      formData.append('rating', rating);
      formData.append('comments', comment);

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
        Alert.alert('Rating&comments added');

        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to add Rating&comments.');
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
      console.log(data);
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
      console.log(data);
      setIngredientDetail(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getSteps();
    getIngredients();
  }, []);

  function renderStepItem({item}) {
    return (
      <View>
        <Text style={styles.content}>{item.Nuskhasteps}</Text>
      </View>
    );
  }

  function renderIngredientItem({item}) {
    return (
      <View>
        <Text style={styles.content}>
          {item.IngredientName} ({item.ingredientquantity} {item.ingredientunit}
          )
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Heading Text */}
      <Text style={styles.heading}>{Nuskhaname}</Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Steps */}
      <Text style={styles.subHeading}>Steps</Text>
      <FlatList
        data={steps}
        renderItem={renderStepItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Ingredients */}
      <Text style={styles.subHeading}>Ingredients</Text>
      <FlatList
        data={ingredientDetail}
        renderItem={renderIngredientItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Ranking */}
      <Text style={styles.subHeading}>Ranking</Text>
      <StarRating
        selectedStar={v => setRating(v)}
        disabled={false}
        maxStars={5}
        rating={rating}
        starSize={25}
        fullStarColor={'gold'}
        emptyStarColor={'black'}
      />

      <View style={styles.divider} />

      <View style={styles.inputContainer}>
        <TextInput
          value={comment}
          style={styles.searchInput}
          placeholder="Comment"
          onChangeText={text => setcomment(text)}
        />
        <TouchableOpacity onPress={Ratingcomments} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Navigation Buttons */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Forums')}
        style={styles.button}>
        <Text style={styles.buttonText}>See Comments & Replies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProductDescription', {Nuskhaid})
        }
        style={[styles.button, {width: 200, marginLeft: 150}]}>
        <Text style={styles.buttonText}>See Products</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  searchInput: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    width: '70%',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#00A040',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: -5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#00A040',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Remedy;
