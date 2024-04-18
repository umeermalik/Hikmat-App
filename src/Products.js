import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

const ProductDescription = props => {
  const comments = [
    {
      id: '1',
      title: 'umeraziz803@gmail.com',
      description:
        'I used to get a lot of dandruff in my hair, but when I started using this product, all the dandruff is gone.',
    },
    {
      id: '2',
      title: 'malikumer830@outlook.com',
      description: 'Very efficient product for weak hair.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../src/assets/mughziatOil_1f86d3db-3f35-45c4-b241-8ecf9a1c02ea_1024x1024.webp')}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productText}>Mughziat Hair Oil</Text>
          <Text style={styles.hakeemName}>Hakeem Zain</Text>
          <Text style={styles.price}>Price: $999</Text>
          <Text style={styles.ranking}>⭐️⭐️⭐️⭐️⭐️</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          {/* <Image
            source={require('./assets/icons8-delivery-time-30.png')}
            style={styles.icon}
          /> */}
          <Text style={styles.iconText}>Delivery on Time</Text>
        </View>
        <View style={styles.iconContainer}>
          {/* <Image
            source={require('./assets/icons8-pay-30.png')}
            style={styles.icon}
          /> */}
          <Text style={styles.iconText}>Cash</Text>
        </View>
        <View style={styles.iconContainer}>
          {/* <Image
            source={require('./assets/icons8-return-30.png')}
            style={styles.icon}
          /> */}
          <Text style={styles.iconText}>No Return</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.productBenefits}>
        Uuse daily at early morning and wash it after 30 min
      </Text>
      <View style={styles.divider} />
      <Text>Add Ranking </Text>
      <Text style={styles.rankings}>⭐️⭐️⭐️⭐️⭐️</Text>
      <View style={styles.divider} />
      {/* <Text style={styles.productBenefits}>
        Haldi 20 gram, zaytoon 60 gram.
        <Text>Some ingredient are hidden due to privacy. </Text>
      </Text> */}
      {/* <View style={styles.divider} /> */}
      {/* <View style={styles.commentInputContainer}>
        <TextInput placeholder="Write a comment" style={styles.commentInput} />
        <TouchableOpacity style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Submit</Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('Comments&replies')}
        style={styles.replyButton}>
        <Text style={styles.replyText}>See comment & Reply</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Buy')}
        style={styles.addToCart}>
        <Text style={styles.addToCartText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 150,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 20,
    flexShrink: 1,
  },
  productText: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
  },
  hakeemName: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
  ranking: {
    fontSize: 16,
    color: '#666',
  },
  rankings: {
    fontSize: 34,
    color: '#666',
  },
  divider: {
    borderWidth: 0.5,
    marginVertical: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconText: {
    fontSize: 12,
    color: '#666',
  },
  productBenefits: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  commentInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#999',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  replyButton: {
    backgroundColor: '#00bcd4',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  replyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addToCart: {
    backgroundColor: '#00A040',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
  },
  addToCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
