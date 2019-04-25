import React from "react";
import { createBottomTabNavigator , createAppContainer} from "react-navigation";

import Home from '../views/Home';
import First from '../views/First';
import Second from '../views/Second';
import Learning from '../views/Learning'

export const Tab = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Book: {
    screen: First,
  },
  Statistics: {
    screen: Second,
  },
  Learning:{
    screen : Learning,
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#f2f2f2',
    activeBackgroundColor: "#2EC4B6",
    inactiveTintColor: '#666',
    labelStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Iowan Old Style',
      padding: 5
    }
  }
}));