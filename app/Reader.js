import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Animated,
  Modal,
  StatusBar
} from 'react-native';
import { Epub, Streamer, Rendition} from "epubjs-rn";
import BottomBar from '../app/BottomBar'
import TopBar from '../app/TopBar'
import Nav from '../app/Nav'
import LookUp from './views/LookUp';

class EpubReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flow: "paginated", // paginated || scrolled-continuous
      location: 6,
      url: "https://s3.amazonaws.com/epubjs/books/moby-dick.epub",
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
    this.streamer.start()
      .then((origin) => {
        this.setState({origin})
        return this.streamer.get(this.state.url);
      })
      .then((src) => {
        return this.setState({src});
      });

    setTimeout(() => this.toggleBars(), 1000);
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
              style={[styles.bar, { top:0 }]}>
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
  }
});

export default EpubReader;