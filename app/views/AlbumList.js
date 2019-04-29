import React, {Component} from 'react';
import { ScrollView, View,StyleSheet } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';


class AlbumList extends Component{

    state = { albums : []};

    componentWillMount(){
        console.log('Mounteds');
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({albums : response.data}))
    }

    

renderAlbums(){
    return this.state.albums.map(album => 
            <AlbumDetail style={{width: '50%'}} key={album.title} album={album}/>
        );
}

render(){
    return (
        <ScrollView >
        <View style={styles.container}>
        {this.renderAlbums()}
        </View>
        </ScrollView>
    );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start' ,
    },
});




export default AlbumList;