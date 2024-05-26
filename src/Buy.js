import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar, // Import StatusBar
} from 'react-native';
import Imagepath from './Imagepath';

const Buy = props => {
  const {pid, nid, price, name, image} = props.route.params;
  console.log(price, name, image, pid, nid);
  const [data, setData] = useState([
    {
      pid,
      name,
      description: 'Diabetes remedy',
      price,
      quantity: 0,
    },
  ]);

  const [totalcost, setTotalCost] = useState(0);

  const handleIncrement = index => {
    const updatedData = [...data];
    updatedData[index].quantity++;
    setData(updatedData);
    setTotalCost(totalcost + parseInt(updatedData[index].price));
  };

  const handleDecrement = index => {
    const updatedData = [...data];
    if (updatedData[index].quantity > 0) {
      updatedData[index].quantity--;
      setData(updatedData);
      setTotalCost(totalcost - parseInt(updatedData[index].price));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{uri: Imagepath + image}} />
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>Hakeem Suleman</Text>
              <Text style={styles.price}>Price: ${parseInt(price)}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => handleDecrement(index)}>
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => handleIncrement(index)}>
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <View style={styles.totalCostContainer}>
          <Text style={styles.totalCostText}>Total Cost: ${totalcost}</Text>
        </View>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Background color of the container
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color of the item container
    padding: 10,
    borderRadius: 10,
  },
  image: {width: 100, height: 100, marginRight: 10},
  itemDetails: {flex: 1},
  title: {marginBottom: 5, color: '#000000', fontSize: 20}, // Color of the item title
  description: {color: '#808080', fontSize: 16}, // Color of the item description
  price: {marginTop: 5, color: '#000000', fontSize: 18}, // Color of the item price
  counterContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  counterButton: {
    backgroundColor: '#00A040',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {fontSize: 20, color: '#FFFFFF'}, // Color of the counter button text
  counterText: {fontSize: 18, marginHorizontal: 10},
  footer: {marginTop: 20},
  totalCostContainer: {
    backgroundColor: '#008080',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  totalCostText: {color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}, // Color of the total cost text
  orderButton: {
    backgroundColor: '#00A040',
    width: '70%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  orderButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Buy;
