import React from 'react';
import { Text, View, Image, Linking} from 'react-native';
import Card from './Card'
import CardSection from './CardSection'
import Button from './Button'

const AlbumDetail = ({album}) =>{
const { title, artist, thumbnail_image, image,url} = album;
const {thumbnailContainerStyle,thumbnailStyle,headerContentStyle,headerTextStyle,imageStyle} = styles;

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}> 
                <Image style={imageStyle} source= {{uri: image}}/>
                </View>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle : {
        justifyContent: 'space-around',
        flexDirection : 'column'
    },
    headerTextStyle : {
        fontSize:18,
        color:'white'

    },
    thumbnailStyle :{
        height : 50,
        width: 50
    },
    thumbnailContainerStyle : {
        justifyContent : 'center',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10

    },
    imageStyle : {
        height : 200,
        flex : 1,
        width:100
    }
};

export default AlbumDetail;