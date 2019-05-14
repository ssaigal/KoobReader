import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from 'react-native-popup-dialog';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import axios from 'axios';
import ImageSliderEx from './ImageSliderEx';
import Button from './Button'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dialogContentView: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    backgroundColor: '#000000',
  },
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
});

class LookUp extends Component {

  constructor(props) {
    super(props);
  
  this.state = {
    customBackgroundDialog: false,
    defaultAnimationDialog: false,
    scaleAnimationDialog: false,
    slideAnimationDialog: false,
    albums : [],
    word : this.props.wordLookup,
    isReady:false,
    imageData : [],
    show: this.props.showButton,
    word_name: '',
      meaning: '',
      sentence: '',
      frequency: '',
      book: '',
  };
  this.updateListing = this.updateListing.bind(this);
  this.register_user = this.register_user.bind(this);


}

register_user = () => {
    var that = this;
    const  word_name  = this.props.wordLookup;
    const  meaning  = this.state.meaning;
    const  sentence  = "TODO";
    const  frequency  = 1;
    const  book  = this.props.bookName;

    if (word_name) {
      if (meaning) {
        if (sentence) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_words (word_name , meaning, sentence, frequency , book) VALUES (?,?,?,?,?)',
              [word_name, meaning, sentence, frequency, book],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Registered Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('Learning'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } 
              }
            );
          });
        }}}
  };

    componentDidMount(){
      this.updateListing();
      
    }

    componentDidUpdate(prevProps){
      if(JSON.stringify(this.props.wordLookup) !== JSON.stringify(prevProps.wordLookup) )
      {
            this.updateListing();
      }
    }

    updateListing(){
      var url = 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + this.props.wordLookup;
      var imageUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + this.props.wordLookup;
      axios
      .get(url)
      .then(response => {
      this.setState({ meaning: response.data.results[0].senses[0].definition});
      return axios.get(imageUrl, { headers: { "Ocp-Apim-Subscription-Key" : "457dba72ab0347b28f31e688d4a332e5" } });
      })
      .then(response => {
        this.setState({ imageData: response.data.queryExpansions, isReady: true});
      }).catch(this.setState({isReady:false}));
      
    }

    renderAlbums(){
      const {isReady} = this.state; 
      //var dicionaryCount = Object.keys(this.state.albums).length;
      var imageCount = Object.keys(this.state.imageData).length;
      //console.log(parseInt(dicionaryCount), parseInt(imageCount));
               if( parseInt(imageCount) > 0 && (isReady === true )){
               const images = this.state.imageData.map((item) => item.thumbnail.thumbnailUrl);
               console.log(images);
               
      return(
            <ScrollView>
              <ImageSliderEx img = {images} />
              <Text style = {{fontSize: 16,fontWeight: 'bold', padding: 10}}>{this.props.wordLookup}</Text>
              <Text style = {{fontSize: 16, paddingLeft: 10}}>{this.state.meaning} </Text>
            </ScrollView>
          );
      }
          return(
            <View>
              <Text>Not Found!</Text>
            </View>
          )
  }
  afterSetStateFinished= ()=>{
    this.setState({show: false })
  }
  

  renderLookUp(){
    return (
    <View style={{ flex: 1 }}>
    <Dialog
      onDismiss={() => {
        this.setState({ defaultAnimationDialog: false });
      }}
      width={0.9}
      visible={this.state.defaultAnimationDialog}
      rounded
      actionsBordered
      dialogTitle={
        <DialogTitle
          title="Look-up: Definition and Image"
          style={{
            backgroundColor: '#F7F7F8',
          }}
          hasTitleBar={false}
          align="left"
        />
      }
      footer={
        <DialogFooter>
          <DialogButton
            text="CANCEL"
            bordered
            onPress={() => {
              this.setState({ defaultAnimationDialog: false });
            }}
            key="button-1"
          />
          <DialogButton
            text="OK"
            bordered
            onPress={() => {
              this.setState({ defaultAnimationDialog: false});
              this.register_user();
            }}
            key="button-2"
          />
        </DialogFooter>
      }
    >
      <DialogContent
        style={{
          backgroundColor: '#F7F7F8',
        }}
      >
        <View>
      {this.renderAlbums()}
    </View>
      </DialogContent>
    </Dialog>
  </View>
  );
  }

  render() {
    return (
      <View style={{ flex: 0, justifyContent: 'flex-start', height:40, width:130 , position: 'absolute', bottom: 1, left: 120}}>
        <Button
            onPress={() => {
              this.setState({
                defaultAnimationDialog: true,
              });
            }}
          />
        <View >
        {this.renderLookUp()}
        </View>
        
      </View>
    );
  }
}

export default LookUp;