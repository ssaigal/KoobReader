import React, { Component } from "react";
import { ScrollView, Button, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import AlbumList from './AlbumList'


class Home extends Component {

  
  
 render() {
  const {navigate} = this.props.navigation;
    return (
        <ScrollView>
          <Button
        title="Go to Jane's profile"
        onPress={() => navigate('First', {name: 'Jane'})}
      />
      <AlbumList />
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