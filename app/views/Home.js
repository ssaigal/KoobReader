import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from 'react-native';
import AlbumList from './AlbumList'

class Home extends Component {
 render() {
    return (
        <ScrollView>
          <AlbumList/>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 300,
  },
});

export default Home;