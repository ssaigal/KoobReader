import React, {Component} from 'react';
import {View} from 'react-native';
import { Tab } from './app/config/navigation';
import  Header  from './app/views/header';

console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {

  
  render() {
    return (
      <View style={{flex: 1}}>
      <Header headerText= {'KOOB'}/>
      <Tab/>
      </View>
       
      
    );
  }
}

