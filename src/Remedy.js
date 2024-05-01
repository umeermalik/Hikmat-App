import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Api from './Api';
import StarRating from 'react-native-star-rating';

const Remedy = props => {
  const {id, Nuskhaid, Nuskhaname} = props.route.params;
  console.log(id, Nuskhaid, Nuskhaname);
  const [steps, setsteps] = useState([]);
  const [ingredientdetail, setdetail] = useState([]);

  const GetSteps = async () => {
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
      setsteps(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const ingredientsdata = async () => {
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
      setdetail(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  useEffect(() => {
    GetSteps();
  }, []);
  useEffect(() => {
    ingredientsdata();
  }, []);

  function renderStepItem({item}) {
    return (
      <View>
        <Text style={styles.content}>{item.Nuskhasteps}</Text>
      </View>
    );
  }
  function ingredients({item}) {
    return (
      <View>
        <Text style={styles.content}>
          {item.IngredientName}({item.ingredientquantity}
          {item.ingredientunit})
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
        data={ingredientdetail}
        renderItem={ingredients}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Ranking */}
      <Text style={styles.subHeading}>Ranking</Text>

      <StarRating
        disabled={false}
        maxStars={5}
        rating={4}
        starSize={25}
        fullStarColor={'gold'}
        emptyStarColor={'black'}
      />

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Search Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.submitButton}>
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
    </View>
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
    color: 'black', // Text color set to black
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Text color set to black
  },
  searchInput: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    width: '70%',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black', // Text color set to black
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'black', // Text color set to black
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Remedy;
