import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';
 
class FilePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
      fileType: '',
      fileName: '',
      fileSize: '',
    };
  }
  handleChange() {
    //Opening Document Picker
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
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
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.fileName);
        console.log('File Size : ' + res.fileSize);
            })
            .catch(_err => {
              // error
            });
          }
      }
    );
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
    backgroundColor: 'black',
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
