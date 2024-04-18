import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Remedy = props => {
  return (
    <View style={styles.container}>
      {/* Heading Text */}
      <Text style={styles.heading}>Hairfall Remedy</Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Steps */}
      <Text style={styles.subHeading}>Steps</Text>
      <Text style={styles.content}>1. Take yogurt in a bowl.</Text>
      <Text style={styles.content}>2. Add olive oil and mix well.</Text>
      <Text style={styles.content}>
        3. Separate egg white and add to the mixture.
      </Text>
      <Text style={styles.content}>
        4. Apply on dry hair and leave for 30 minutes before washing off.
      </Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Ingredients */}
      <Text style={styles.subHeading}>Ingredients</Text>
      <Text style={styles.content}>
        Yogurt (500ml), Olive oil (10g), Egg (1)
      </Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Ranking */}
      <Text style={styles.subHeading}>Ranking</Text>
      <Text style={styles.content}>
        Stars will be shown here to rank this remedy
      </Text>

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
        onPress={() => props.navigation.navigate('ProductDescription')}
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
