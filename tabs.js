import React from 'react';

import Cities from './Cities/Cities';
import City from './Cities/City';
import AddCity from './AddCity/AddCity';

import { colors } from './theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// const CitiesNav = createStackNavigator({
//     Cities: {screen: Cities},
//     City: {screen: City}
//     }, {
//         navigatitionOptions: {
//             headerStyle: {
//                 backgroundColor: colors.primary
//             },
//             headerTintColor: '#fff'
//         }
//     });

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

const Tab = createBottomTabNavigator();
function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Cities" component={myStack}/>
            <Tab.Screen name="AddCity" component={AddCity}/>
        </Tab.Navigator>
    )
}
// const Tabs = createBottomTabNavigator({
//     Cities: {screen: CitiesNav},
//     AddCity: {screen: AddCity}
// })

export default Tabs;



