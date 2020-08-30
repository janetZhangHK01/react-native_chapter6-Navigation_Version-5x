import React, { Component  } from 'react'

import Tabs from './Tabs';
import { MyContext } from './context';
import AsyncStorage from '@react-native-community/async-storage';

// const key = 'state'

class App extends React.Component {

    //   async componentDidMount() {
    //   try {
    //     let cities = await AsyncStorage.getItem(key)
    //     cities = JSON.parse(cities)
    //     this.setState({ cities })
    //   } catch (e) {
    //     console.log('error from AsyncStorage: ', e)
    //   }
    // }
    render() {
      return (
        <MyContext>
          <Tabs />
        </MyContext>
      );
    }
  }

  export default App;