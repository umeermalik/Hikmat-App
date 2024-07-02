import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {IconButton} from 'react-native-paper'; // Import IconButton from react-native-paper
import Api from './Api';

const Chat = props => {
  const userid = props.route.params.userid;
  const receiverid = props.route.params.receiverid;

  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch chat messages
  const getChat = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(
        `${Api}/Addnushka/GetChats?user1=${userid}&user2=${receiverid}`,
      );
      const data = await response.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  const sendChat = async newMessages => {
    try {
      const url = `${Api}/Addnushka/SendChat`;
      const formData = new FormData();
      formData.append('s_id', userid);
      formData.append('r_id', receiverid);
      formData.append('message', newMessages[0].text);

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
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
        console.log('Response data:', data);
        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to send chat.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  // Custom renderBubble function to conditionally style messages
  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'lightgrey',
        },
        right: {
          backgroundColor: '#366C73',
        },
      }}
    />
  );

  // Custom input toolbar to apply styles to the text input
  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.textInput}
    />
  );

  // Custom renderSend function to replace text with an icon
  const renderSend = props => (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <IconButton icon="send" size={25} color="#0A3BEE" />
      </View>
    </Send>
  );

  const user = {
    _id: userid, // Use the sender's ID from props
    name,
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0A3BEE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages} // Use hardcoded messages
        onSend={sendChat}
        user={user}
        renderUsernameOnMessage
        renderBubble={renderBubble} // Use custom bubble render
        renderInputToolbar={renderInputToolbar} // Use custom input toolbar
        renderSend={renderSend} // Use custom send button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8', // Change the background color here
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    color: 'black',
    width: '100%',
  },
  inputToolbar: {
    borderTopWidth: 1,
    backgroundColor: 'lightgrey',
    color: 'black',
    padding: 5,
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Chat;
