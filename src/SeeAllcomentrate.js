import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import StarRating from 'react-native-star-rating';
import Api from './Api';

const SeeAllCommentRate = props => {
  const {Id, name} = props.route.params;
  console.log(Id);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const url = `${Api}/Addnushka/GetCommentOfNuskha?nid=${1}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      setComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const renderItem = ({item}) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}> {item.Comment}</Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={item.rate}
        starSize={20}
        fullStarColor="gold"
      />
    </View>
  );

  return (
    <FlatList
      data={comments}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SeeAllCommentRate;
