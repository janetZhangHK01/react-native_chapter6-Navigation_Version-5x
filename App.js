import React, { Component  } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Cities from './Cities/Cities';
import City from './Cities/City';
import AddCity from './AddCity/AddCity';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
function myStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: colors.primary}
        }}>
            <Stack.Screen name="Cities" component={Cities}/>
            <Stack.Screen name="City" component={City}/>
        </Stack.Navigator>
    )
}

// import Tabs from './tabs';

const key = 'state'

const initialState = [{
    city: 'Paris',
    country: 'France',
    id: 0,
    locations: []
},
{
    city: 'Tokyo',
    country: 'Japan',
    id: '1',
    locations: []
}]

export default class App extends Component {
    state = {
      cities: [{
        city: 'Paris',
        country: 'France',
        id: 0,
        locations: []
    },
    {
        city: 'Tokyo',
        country: 'Japan',
        id: '1',
        locations: []
    }]
    }
    async componentDidMount() {
      try {
        let cities = await AsyncStorage.getItem(key)
        cities = JSON.parse(cities)
        this.setState({ cities })
      } catch (e) {
        console.log('error from AsyncStorage: ', e)
      }
    }
    addCity = (city) => {
      const cities = this.state.cities
      cities.push(city)
      this.setState({ cities })
      AsyncStorage.setItem(key, JSON.stringify(cities))
        .then(() => console.log('storage updated!'))
        .catch(e => console.log('e: ', e))
    }
    addLocation = (location, city) => {
      const index = this.state.cities.findIndex(item => {
        return item.id === city.id
      })
      const chosenCity = this.state.cities[index]
      chosenCity.locations.push(location)
      const cities = [
        ...this.state.cities.slice(0, index),
        chosenCity,
        ...this.state.cities.slice(index + 1)
      ]
      this.setState({
        cities
      }, () => {
        AsyncStorage.setItem(key, JSON.stringify(cities))
          .then(() => console.log('storage updated!'))
          .catch(e => console.log('e: ', e))
        })
    }
    render() {
      const Tab = createBottomTabNavigator();
      console.log(this.state.cities)
      return (
          <Tab.Navigator screenProps={{ cities: this.state.cities, addCity: this.addCity, addLocation: this.addLocation }}>
            <Tab.Screen name="Cities" component={myStack}/>
            <Tab.Screen name="AddCity" component={AddCity}/>
        </Tab.Navigator>
      )
    }
  }