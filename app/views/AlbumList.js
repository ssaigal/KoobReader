import React, { Component } from 'react';
import { Dimensions, Text, View, ScrollView ,Image, TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import Card from './Card'
import CardSection from './CardSection'
 
const width = Dimensions.get('window').width - 20;

class AlbumList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Books_Table', [], (tx, results) => {
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
      <View style={{ height: 0.5, width: '25%', backgroundColor: '#808080' }} />
    );
  };

  renderAlbums(){
    const {navigate} = this.props.navigation;
    return this.state.FlatListItems.map(item => 
            <TouchableOpacity
  style={{margin: 30}}
   key = {item.book_name}
   onPress={() => navigate('First', {bookPath : item.link})}
 >
  <Card>
      <CardSection>
          <View style={{justifyContent : 'space-between',
        alignItems: 'center',
        marginLeft:2,
        marginRight:2}}> 
          <Image style={{height : 150,flex : 1,width:100}} source= {{uri: item.imgpath}}/>
          </View>
      </CardSection>
  </Card>
  </TouchableOpacity>
        );
}

  render() {
    return (

      <View style={{ flex:1 }}>
        <ScrollView style={{ flex:1 }}>
         <View style={{flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'} }>{this.renderAlbums()}</View>
        </ScrollView>
      </View>
    );
  }

  
}

export default  AlbumList;
