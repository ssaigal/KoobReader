import React from "react";
import { createBottomTabNavigator ,createSwitchNavigator, createStackNavigator,createAppContainer} from "react-navigation";

import Home from '../views/Home';
import First from '../views/First';
import Statistics from '../views/Statistics';
import Learning from '../views/Learning'
import Reader from '../Reader'
import AlbumList from '../views/AlbumList'



const BookNavigator = createStackNavigator({
  AlbumList: {
    screen : AlbumList,
  },
  First : {
    screen: Reader,
    navigationOptions: { header: null, tabBarVisible: false },
  },
},
{
  headerMode : 'none',
  mode: 'modal'
});

const Tab = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: BookNavigator,
  },
  Book: {
    screen: Reader,
    navigationOptions: { header: null, tabBarVisible: false },
  },
  Statistics: {
    screen: Statistics,
  },
  Learning:{
    screen : Learning,
  }
}, 
{
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  mode: 'modal',
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: "#3c92d8",
    inactiveTintColor: 'white',
    labelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Iowan Old Style',      
      //padding: 5
    },
    style: {
      backgroundColor: '#2a343d',
      height: 40

    },
  }
}));

const InitialNavigator = createSwitchNavigator({
  Tab: Tab,
  Tab: Tab
});

const AppContainer = createAppContainer(InitialNavigator);

class Navigator extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

export default Navigator;