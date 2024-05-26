import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

const HakeemHhome = props => {
  const {name, id} = props.route.params;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Hikmat</Text>
          <Text style={styles.headerSubtitle}>Welcome,</Text>
          <Text style={styles.headerUsername}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Add Nushka', {id, name})}
            style={styles.option}>
            <Image
              style={styles.optionImage}
              source={require('../src/assets/addRemedy.jpg')}
            />
            <Text style={styles.optionText}>Add Remedy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewRemedy', {id, name})}
            style={styles.option}>
            <Image
              style={styles.optionImage}
              source={require('../src/assets/buy.jpg')}
            />
            <Text style={styles.optionText}>View Remedy</Text>
          </TouchableOpacity>
        </View>
        {/* Uncomment and style the second row as needed */}
        {/* <View style={styles.row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Remedies')}
            style={styles.option}>
            <Image
              style={styles.optionImage}
              source={require('../src/assets/sales.jpg')}
            />
            <Text style={styles.optionText}>Total Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Remedies')}
            style={styles.option}>
            <Image
              style={styles.optionImage}
              source={require('../src/assets/buy.jpg')}
            />
            <Text style={styles.optionText}>Buy</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#00A040',
    height: 260,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 45,
    fontFamily: 'Cursive',
    marginTop: 10,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '100',
    fontFamily: 'Arial',
    marginTop: 60,
  },
  headerUsername: {
    color: 'white',
    fontSize: 30,
    fontWeight: '100',
    marginTop: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: -50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 90,
  },
  optionImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
  },
});

export default HakeemHhome;
