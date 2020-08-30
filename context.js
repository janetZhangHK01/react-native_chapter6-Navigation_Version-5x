import React, { Component } from "react"
// import {AsyncStorage} from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

const TodosContext = React.createContext()

const TodosProvider = TodosContext.Provider
const TodosConsumer = TodosContext.Consumer


const key = 'state'
class MyContext extends Component {
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
        }
        , () => {
          AsyncStorage.setItem(key, JSON.stringify(cities))
            .then(() => console.log('storage updated!'))
            .catch(e => console.log('e: ', e))
          })
      }

    render() {
        return (
            <TodosProvider value={{...this.state, addCity: this.addCity, addLocation: this.addLocation}}>{this.props.children}</TodosProvider>
        )
    }
}

export { TodosContext, MyContext, TodosConsumer }