import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'KoobDatabase.db' });
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';
 
class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
      fileType: '',
      fileName: '',
      fileSize: '',
    };
    this.register_book = this.register_book.bind(this);

  }


  register_book = () => {
    var that = this;
    const  fileURI  = this.state.fileUri;
    console.log("Path is ",fileURI)
    const  fileName  = this.state.fileName;
    const  author  = "TODO";
    const  imagePath  = "https://www.shermusic.com/new/images/0961470143.jpg";

          db.transaction(function(tx) {
            console.log("Book Register")
            tx.executeSql(
              'INSERT INTO Books_Table (book_name, link , flag , author , imgpath ) VALUES (?,?,?,?,?)',
              [fileName, fileURI, 0, author, imagePath],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    alert(
                      'Success',
                      'Book Uploaded Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('Home'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } 
              }
            );
          });
        
      };


  handleChange() {
    //Opening Document Picker
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (error, res) => {
          if(res) {
            FileViewer.open(res.uri)
            .then(() => {
              this.setState({ fileUri: res.uri });
        this.setState({ fileType: res.type });
        this.setState({ fileName: res.fileName });
        this.setState({ fileSize: res.fileSize });


 
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + this.state.fileUri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.fileName);
        console.log('File Size : ' + res.fileSize);
            })
            .then(() => {
              this.register_book();
            })
            .catch(_err => {
              // error
            });
          }
      }
    )
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ alignItems: 'center' }}
          onPress={this.handleChange.bind(this)}>
          <Image
            source={{
              uri:
                'https://aboutreact.com/wp-content/uploads/2018/09/clips.png',
            }}
            style={styles.ImageIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a343d',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ImageIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'stretch',
  },
});

export default FilePicker;
