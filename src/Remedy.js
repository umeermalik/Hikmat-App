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

const Remedy = props => {
  const {id, Nuskhaid, Nuskhaname, Hakeemid, hakeemUserId} = props.route.params;
  console.log(props.route.params);
  const [hakeemids, sethakeemids] = useState(Hakeemid);
  console.log(Hakeemid, 'this is hakeem id ');
  console.log(id, 'userid');
  console.log(Hakeemid);
  const [nuskaRating, setNuskaRating] = useState(0);
  const [Rate, setrating] = useState(0);
  const [hakeemRating, setHakeemRating] = useState(0);
  const [steps, setSteps] = useState([]);
  const [comment, setComment] = useState('');
  const [usage, setUsage] = useState([]);
  const [ingredientDetail, setIngredientDetail] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const Ratingcomments = async () => {
    try {
      const url = `${Api}/Addnushka/ratingcomments`;
      const formData = new FormData();
      formData.append('n_id', Nuskhaid);
      formData.append('u_id', id);
      formData.append('rating', nuskaRating);
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
  const rateingredients = async () => {
    try {
      const url = `${Api}/Addnushka/AddingRating`;
      const formData = new FormData();
      formData.append('u_id', id);
      formData.append('ii_id', ingredientDetail.nushkaingreid);

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
  console.log(ingredientDetail, 'okay');
  const hakeemrate = async () => {
    try {
      const url = `${Api}/Addnushka/HakeemRating?user_id=${id}&h_id=${1}&rating=${hakeemRating}`;

      // Logging the URL
      console.log('Request URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Logging Response
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);

      if (response.ok) {
        Alert.alert('Success', 'Rating added successfully');
      } else {
        Alert.alert('Error', responseText); // Display detailed error
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
      console.log(data);
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
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ingredientRating', {
            ingredientid: item.nushkaingreid,
            id,
          })
        }>
        <Text style={styles.listText}>
          {item.nushkaingreid} {item.IngredientName} ({item.ingredientquantity}
          {item.ingredientunit})
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={item.ingredientrate}
          starSize={20}
          fullStarColor={'#FFD700'}
          emptyStarColor={'#d3d3d3'}
          containerStyle={styles.starContainer}
        />
      </TouchableOpacity>
    </View>
  );

  const renderUsageItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.Nuskhausage}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitHakeemRating = () => {
    toggleModal();
  };

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

      <Text style={styles.subHeading}>Nuska Rating</Text>
      <StarRating
        selectedStar={setNuskaRating}
        disabled={false}
        maxStars={5}
        rating={nuskaRating}
        starSize={30}
        fullStarColor={'gold'}
        emptyStarColor={'gray'}
      />

      <View style={styles.divider} />

      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.hakeemRatingText}>
          Click here to rate Ingredients
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.inputContainer}>
        <TextInput
          value={comment}
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor="gray"
          onChangeText={setComment}
        />
        <TouchableOpacity
          onPress={Ratingcomments}
          style={[styles.modalButton, styles.submitButton]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.navigate('Chat', {
            userid: id,
            receiverid: hakeemUserId,
          })
        }>
        <Text style={styles.buttonText}>Chat With Hakeem</Text>
      </TouchableOpacity>
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

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Ingredients Rating</Text>
            <StarRating
              selectedStar={setrating}
              disabled={false}
              maxStars={5}
              rating={Rate}
              starSize={30}
              fullStarColor={'gold'}
              emptyStarColor={'gray'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={toggleModal}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={rateingredients}
                style={[styles.modalButton, styles.submitButton]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

export default Remedy;
