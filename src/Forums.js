import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Api from './Api';

const Forum = props => {
  const {Nuskhaid} = props.route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const url = `${Api}/Addnushka/GetCommentOfNuskha?nid=${Nuskhaid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.Comment}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.buttonText}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.seeReplyButton}>
          <Text style={styles.buttonText}>See All Replies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Remedy')}
        style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  commentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  replyButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  seeReplyButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  doneButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Forum;
