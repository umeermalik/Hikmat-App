// ChatList.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Api from './Api';

const ChatList = props => {
  const userid = props.route.params.userid; // Get userid from route params
  console.log('USERiD: ', userid);
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);

  //   const chatList = [
  //     {
  //       id: 1,
  //       userid: 1,
  //       name: 'John Doe',
  //       lastMessage: 'Hello, how are you?',
  //     },
  //     {
  //       id: 2,
  //       userid: 2,
  //       name: 'Jane Smith',
  //       lastMessage: 'Let’s catch up tomorrow!',
  //     },
  //     {
  //       id: 3,
  //       userid: 3,
  //       name: 'Bob Johnson',
  //       lastMessage: 'Meeting at 5 PM.',
  //     },
  //   ];

  const GetAllChats = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(
        `${Api}/Addnushka/GetAllChats?userid=${userid}`,
      );
      const data = await response.json();
      console.log(data);
      setChatList(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    GetAllChats();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        props.navigation.navigate('Chat', {
          userid: userid, // Pass userid as value
          receiverid: item.userid, // Pass item.userid as value
        })
      }>
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0A3BEE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={chatList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  chatItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  chatDetails: {
    flexDirection: 'column',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatList;
