import React, {Component} from 'react';
import { ScrollView } from 'react-native';
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
            <AlbumDetail key={album.title} album={album}/>
        );
}

render(){
    return (
        <ScrollView style={{flex:1, flexDirection:'row'}}>
          {this.renderAlbums()}
        </ScrollView>
    );
    }
}


export default AlbumList;