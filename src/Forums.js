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
  const {Nuskhaid, id} = props.route.params;
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});

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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchAllReplyComments = async commentId => {
    try {
      const url = `${Api}/Addnushka/GetAllCommentReply?c_id=${commentId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await response.json();
      setReplies(prevReplies => ({...prevReplies, [commentId]: data}));
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const renderReplies = commentId => {
    const repliesForComment = replies[commentId];
    if (!repliesForComment) return null;

    return repliesForComment.map(reply => (
      <View key={reply.id} style={styles.replyContainer}>
        <Text style={styles.replyUser}>{reply.usermail}</Text>
        <Text style={styles.replyText}>{reply.replycomment}</Text>
      </View>
    ));
  };

  const renderItem = ({item}) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUser}>{item.usermail}</Text>
      <Text style={styles.commentText}>{item.Comment}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() =>
            props.navigation.navigate('Reply', {id, commentsid: item.commentid})
          }>
          <Text style={styles.buttonText}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => fetchAllReplyComments(item.commentid)}
          style={styles.seeReplyButton}>
          <Text style={styles.buttonText}>See All Replies</Text>
        </TouchableOpacity>
      </View>
      {renderReplies(item.commentid)}
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
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  commentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  replyButton: {
    backgroundColor: '#dcdcdc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  seeReplyButton: {
    backgroundColor: '#87ceeb',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  replyContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  replyUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  replyText: {
    fontSize: 14,
    color: '#555',
  },
  doneButton: {
    backgroundColor: '#333',
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
