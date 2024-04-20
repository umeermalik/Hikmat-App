import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginuser from './src/Login';
import Hakee_Home from './src/HakeemHome';
import Addremedy from './src/AddRemedy';
import Addingredients from './src/Ingredients';
import Steps from './src/Steps';
import AddProducts from './src/Addproducts';
import Viewremedy from './src/ViewRemedy';
import PatienHome from './src/PatientHome';
import Remedy from './src/Remedy';
import Forum from './src/Forums';
import Setttingup from './src/SeetingUp';
import ProductDescription from './src/Products';
import Buy from './src/Buy';
import Signup from './src/Signup';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PatientHome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00A040', // Set your desired color here
          },
          headerTintColor: 'white', // Set the text color of the header
        }}>
        <Stack.Screen
          name="Login"
          component={Loginuser}
          option={{HeaderShown: false}}
        />
        <Stack.Screen
          name="Hakeem home"
          component={Hakee_Home}
          screenOptions={{HeaderShown: false}}
        />

        <Stack.Screen
          name="Add Nushka"
          component={Addremedy}
          // screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          // screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="Ingredients"
          component={Addingredients}
          screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="Buy"
          component={Buy}
          screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="AddProducts"
          component={AddProducts}
          // screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="Steps"
          component={Steps}
          // screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="ViewRemedy"
          component={Viewremedy}
          // screenOptions={{HeaderShown: false}}
        />
        <Stack.Screen
          name="PatientHome"
          component={PatienHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Remedy"
          component={Remedy}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forums"
          component={Forum}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingUp"
          component={Setttingup}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDescription"
          component={ProductDescription}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
