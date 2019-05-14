import React, { Component } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import Card from './Card';
import CardSection from './CardSection';
 

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_words', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.word_id} style={{ backgroundColor: 'white', padding: 20 }}>
            <Card>
            <CardSection>
                <View style={{justifyContent: 'space-around',flexDirection : 'column'}}> 
                <Text style={{fontSize:18,color:'white',}}>Word: {item.word_name}</Text>
                <Text style={{fontSize:18,color:'white'}}>Definition: {item.meaning}</Text>
                <Text style={{fontSize:18,color:'white'}}>Sentence: {item.sentence}</Text>
                <Text style={{fontSize:18,color:'white'}}>Frquency: {item.frequency}</Text>
                <Text style={{fontSize:18,color:'white'}}>Book: {item.book}</Text>
                </View>
            </CardSection>
        </Card>
              

            </View>
          )}
        />
      </ScrollView>
    );
  }

  
}
export default  Learning;