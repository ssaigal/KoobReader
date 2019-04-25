import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ScrollView} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from 'react-native-popup-dialog';
import axios from 'axios';
import ImageSliderEx from './ImageSliderEx'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    // backgroundColor: '#000000',
  },
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
});

class Learning extends Component {

  constructor(props) {
    super(props);
  }
  state = {
    customBackgroundDialog: false,
    defaultAnimationDialog: false,
    scaleAnimationDialog: false,
    slideAnimationDialog: false,
    albums : [],
    word : this.props.wordLookup,
    isReady:false,
    imageData : [],
  };

    componentWillMount(){
      var url = 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + this.state.word;
      var imageUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + this.state.word;
      axios
      .get(url)
      .then(response => {
      this.setState({ albums: response.data.results, isReady:true});
      return axios.get(imageUrl, { headers: { "Ocp-Apim-Subscription-Key" : "457dba72ab0347b28f31e688d4a332e5" } });
      })
      .then(response => {
        this.setState({ imageData: response.data.queryExpansions, isReady: true});
      }).catch(this.setState({isReady:false}));
    }

    renderAlbums(){
      const {isReady} = this.state; 
  
               if(isReady){
               const images = this.state.imageData.map((item) => item.thumbnail.thumbnailUrl)
               console.log(images);
      return(
            <ScrollView>
              <ImageSliderEx img = {images} />
              <Text style = {{fontSize: 16,fontWeight: 'bold', padding: 10}}>{this.state.word}</Text>
              <Text style = {{fontSize: 16, paddingLeft: 10}}>{this.state.albums[0].senses[0].definition} </Text>
            </ScrollView>
          );
      }
          return(
            <View>
              <Text>Not Found!</Text>
            </View>
          )
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
      // actionContainerStyle={{
      //   height: 100,
      //   flexDirection: 'column',
      // }}
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
              this.setState({ defaultAnimationDialog: false });
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
      <View style={{ flex: 0, justifyContent: 'flex-start', height:85 }}>
        
        <Button
            title="Define"
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

export default Learning;