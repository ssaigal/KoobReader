import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  StatusBar
} from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/AntDesign';
import { Epub, Streamer, Rendition} from "epubjs-rn";
import BottomBar from '../app/BottomBar'
import TopBar from '../app/TopBar'
import Nav from '../app/Nav'
import LookUp from './views/LookUp';

class EpubReader extends Component {
  constructor(props) {
    super(props);
    const bookPath = this.props.navigation.getParam('bookPath','file:///Users/cs.sfsu/Downloads/turgenev-home-of-the-gentry.epub');
    this.state = {
      flow: "paginated", // paginated || scrolled-continuous
      location: 6,
      url: bookPath,
      src: "",
      origin: "",
      title: "",
      toc: [],
      showBars: true,
      showBottomBar:true,
      showNav: false,
      sliderDisabled: false,
      wordToLookup: "book",
      showDefine : false,
    };

    this.streamer = new Streamer();
  }
  
  


  componentDidMount() {
    this.root = this.props.root || "www/";
    let filename = this.state.url.split('/').pop();
    this.file = filename;
    let path = RNFS.DocumentDirectoryPath + "/" + this.root;
    let dest = path + this.file;
    console.log(dest);
    RNFS.mkdir(path, { NSURLIsExcludedFromBackupKey: true });

    let added;
    if (this.state.url.indexOf("file://") > -1) {
      // Copy file in release
      added =  RNFS.exists(dest).then((e) => {
        if (!e) {
          return RNFS.copyFile(this.state.url, dest);
        }
      });
    } else {
      // Download for development
      let download = RNFS.downloadFile({
        fromUrl: this.state.url,
        toFile: dest
      });
      added = download.promise;
    }
      
      added.then(()=> {
      this.streamer.start()
      .then((origin) => {
        this.setState({origin})
        console.log(this.state.origin+"/"+filename+"/");
        return this.streamer.get(this.state.origin+"/"+filename+"/");
      })
      .then((src) => {
        return this.setState({src});
      })
    });
    
    
    //setTimeout(() => this.toggleBars(), 1000);
  }


  componentWillUnmount() {
    this.streamer.kill();
  }

  toggleBars() {
    this.setState({ showBars: !this.state.showBars });
  }

  toggleDefineButton(){
    this.setState({showDefine : false});
  }

  renderDefine(){
    if(this.state.showDefine){
    return(
      <View style={{zIndex:5}}>
      <LookUp 
      wordLookup={this.state.wordToLookup}
      showButton={this.state.showDefine}
      bookName={this.state.title} />
      </View>
        );
    }
        return(
          <View></View>
        )
}
_closeModal() {
  setState({
      modalVisible: false
  });
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={!this.state.showBars}
          translucent={true}
          animated={false} />
            
        <Epub style={styles.reader}
              ref="epub"
              //src={"https://s3.amazonaws.com/epubjs/books/moby-dick.epub"}
              src={this.state.src}
              flow={this.state.flow}
              location={this.state.location}
              onLocationChange={(visibleLocation)=> {
                console.log("locationChanged", visibleLocation)
                this.setState({visibleLocation});
              }}
              onLocationsReady={(locations)=> {
                // console.log("location total", locations.total);
                this.setState({sliderDisabled : false});
              }}
              onReady={(book)=> {
                console.log("Metadata", book.package.metadata)
                console.log("Table of Contents", book.toc)
                this.setState({
                  title : book.package.metadata.title,
                  toc: book.navigation.toc,
                  book: book
                });
              }}
              onPress={(cfi, position, rendition)=> {
                this.toggleBars();
                console.log("press", cfi);
              }}
              onLongPress={(cfi, rendition)=> {
                console.log("longpress", cfi);
              }}
              onViewAdded={(index) => {
                console.log("added", index)
              }}
              beforeViewRemoved={(index) => {
                console.log("removed", index)
              }}
              onSelected={(cfiRange, rendition) => {
                console.log("selected", cfiRange)
                let word = "";
                this.state.book.getRange(cfiRange).then(function(range) {
                console.log(`Text: ${range.endContainer.data.substring(range.startOffset, range.endOffset)}`);
                word = `${range.endContainer.data.substring(range.startOffset, range.endOffset)}`;                
                 }).then( () => {
                  this.setState({wordToLookup: word, showDefine : true});
                 }).then(() => {
                   this.renderDefine();
                 });
                //rendition.highlight(cfiRange, {});
              }}
              onMarkClicked={(cfiRange) => {
                console.log("mark clicked", cfiRange)
              }}
              origin={this.state.origin}
              onError={(message) => {
                console.log("EPUBJS-Webview", message);
              }}
            />

              <View>
                {this.renderDefine()}
              </View>
            
            
            <View
              style={[styles.topBar, { top:0 }]}>
              <TopBar
                title={this.state.title}
                shown={this.state.showBars}
                onLeftButtonPressed={() => this._nav.show()}
                onRightButtonPressed={
                  (value) => {
                    if (this.state.flow === "paginated") {
                      this.setState({flow: "scrolled-continuous"});
                    } else {
                      this.setState({flow: "paginated"});
                    }
                  }
                }
               />
            </View>
            <TouchableOpacity style={styles.backButton}
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon name="shrink" size={30} />
            </TouchableOpacity>
            <View
              style={[styles.bar, { bottom:0 }]}>
              <BottomBar
                disabled= {this.state.sliderDisabled}
                value={this.state.visibleLocation ? this.state.visibleLocation.start.percentage : 0}
                shown={this.state.showBottomBar}
                onSlidingComplete={
                  (value) => {
                    this.setState({location: value.toFixed(6)})
                  }
                }/>
            </View>
            <View>
              <Nav ref={(nav) => this._nav = nav }
                display={(loc) => {
                  this.setState({ location: loc });
                }}
                toc={this.state.toc}
              />
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C',
  },
  bar: {
    //position:"absolute",
    left:0,
    right:0,
    height:35
  },
  topBar: {
    position:"absolute",
    left:0,
    right:0,
    height:50
  },
  backButton: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0.05,
    right: 0.05,
    //paddingBottom:10,
    padding: 0,
    //flexDirection: 'row',
  }
});

export default EpubReader;