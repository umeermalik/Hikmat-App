import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

const HakeemHhome = props => {
  const {name, id} = props.route.params;

  console.log(name, id);
  // const id=id;
  //  const { r_id} = props.route.params;

  // const { email, id } = props.route.params;
  // console.warn(id);

  // const [modal, setModal] = useState(false);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00A040',
          height: 260,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 45,
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'Cursive',
            }}>
            Hikmat
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 20,
              marginTop: 60,
              fontSize: 30,
              fontWeight: '100',
              fontFamily: 'Arial',
            }}>
            Welcome,
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 20,
              marginTop: 10,
              fontSize: 30,
              fontWeight: '100',
            }}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'black',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 14}}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%', // Set the width to 80% of the screen width
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* First Row */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Add Nushka', {id, name})}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 90,
              marginRight: 20, // Added margin to create equal spacing
            }}>
            <Image
              style={{
                width: 100, // Adjusted size
                height: 100, // Adjusted size
                borderRadius: 60,
              }}
              source={require('../src/assets/addRemedy.jpg')}
            />
            <Text style={{color: 'black', marginTop: 10}}>Add Remedy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewRemedy')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 90,
            }}>
            <Image
              style={{
                width: 100, // Adjusted size
                height: 100, // Adjusted size
                borderRadius: 60,
              }}
              source={require('../src/assets/buy.jpg')}
            />
            <Text style={{color: 'black', marginTop: 10}}>View Remedy</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {/* Second Row */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Remedies')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
              marginRight: 20, // Added margin to create equal spacing
            }}>
            <Image
              style={{
                width: 100, // Adjusted size
                height: 100, // Adjusted size
                borderRadius: 60,
              }}
              source={require('../src/assets/sales.jpg')}
            />
            <Text style={{color: 'black', marginTop: 10}}>Total Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Remedies')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{
                width: 100, // Adjusted size
                height: 100, // Adjusted size
                borderRadius: 60,
              }}
              source={require('../src/assets/buy.jpg')}
            />
            <Text style={{color: 'black', marginTop: 10}}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HakeemHhome;
