import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Api from './Api';

const Reply = props => {
  const {id, commentsid} = props.route.params;
  console.log(commentsid, id, 'okay');
  const [replycomment, setReplycomment] = useState('');

  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    // Handle reply submission here
    console.log('Reply submitted:', replyText);
    // You might want to navigate back or clear the text input
    setReplyText('');
  };
  const Givereply = async () => {
    try {
      const url = `${Api}/Addnushka/Repliescomment`;
      const formData = new FormData();
      formData.append('u_id', id);
      formData.append('commentid', commentsid);
      formData.append('comment', replycomment);

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
        Alert.alert('Reply added');
        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reply to Comment</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type your reply here..."
        value={replycomment}
        onChangeText={setReplycomment}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={Givereply}>
        <Text style={styles.buttonText}>Submit Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // For Android to align the text at the top
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A040',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reply;
