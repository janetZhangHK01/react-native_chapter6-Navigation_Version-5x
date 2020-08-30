import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Cities from './Cities/Cities';
import City from './Cities/City';
import AddCity from './AddCity/AddCity';

import { colors } from './theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TodosConsumer } from "./context"


const Stack = createStackNavigator();
function myStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#1976D2'}
        }}>
            <Stack.Screen name="Cities" component={Cities}/>
            <Stack.Screen name="City" component={City}/>
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function Tabs() {
    return (
        <TodosConsumer>
        {(value) => {
            return (
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Cities" component={myStack}/>
                        <Tab.Screen name="AddCity" component={AddCity}/>
                    </Tab.Navigator>
                </NavigationContainer>
            );
        }}
        </TodosConsumer>

    );
}

export default Tabs;



