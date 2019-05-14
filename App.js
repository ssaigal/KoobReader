import React, {Component} from 'react';
import {View} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import Navigator from './app/config/navigation';
import  Header  from './app/views/header';

console.disableYellowBox = true;

export default class App extends Component {
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

    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Books_Table'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Books_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Books_Table(book_id INTEGER PRIMARY KEY AUTOINCREMENT, book_name VARCHAR(100), link VARCHAR(2500) , flag BOOLEAN, author VARCHAR, imgpath VARCHAR)',
              []
            );
          }
        }
      );
    });

  }

  
  render() {
    return (
      <View style={{flex: 1}}>
      <Header headerText= {'KOOB'}/>
      <Navigator/>
      </View>
       
      
    );
  }
}

