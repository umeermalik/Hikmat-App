import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const Forum = props => {
  const comments = [
    {
      id: 1,
      email: 'usman@gmail.com',
      content: 'I have used this and I am fully satisfied with it.',
      replies: [
        {id: 1, content: 'How long does this remedy take to show effect?'},
      ],
    },
    {
      id: 2,
      email: 'atif2@gmail.com',
      content: 'The cost is worth it.',
      replies: [{id: 1, content: 'Does it have any side effects?'}],
    },
  ];

  const renderReplyButton = () => (
    <TouchableOpacity style={styles.replyButton}>
      <Text style={styles.replyButtonText}>Reply</Text>
    </TouchableOpacity>
  );

  const renderReplies = replies => (
    <>
      {replies.map(reply => (
        <View key={reply.id} style={styles.replyContainer}>
          <Text style={styles.reply}>{reply.content}</Text>
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={comments}
        renderItem={({item}) => (
          <View style={styles.commentContainer}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.comment}>{item.content}</Text>
            {renderReplyButton()}
            {renderReplies(item.replies)}
            <TouchableOpacity style={styles.seeRepliesButton}>
              <Text style={styles.seeRepliesText}>See All Replies</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Remedy')}
        style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  commentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comment: {
    fontSize: 16,
  },
  replyButton: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  replyButtonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  replyContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  reply: {
    fontSize: 14,
  },
  seeRepliesButton: {
    marginTop: 5,
  },
  seeRepliesText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  showMoreButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 30,
    marginBottom: 20, // Adjust the marginTop here to move the button up
    alignItems: 'center',
  },
  showMoreText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Forum;
