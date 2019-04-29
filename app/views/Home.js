import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'BooksDatabase.db' });
import AlbumList from './AlbumList'

class Home extends Component {

  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_words'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_words', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_words(word_id INTEGER PRIMARY KEY AUTOINCREMENT, word_name VARCHAR(100), meaning VARCHAR(300), sentence VARCHAR, frequency INT(100), book VARCHAR(100))',
              []
            );
          }
        }
      );
    });
  }
  
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