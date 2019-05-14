import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import Card from './Card'
import CardSection from './CardSection'

const AlbumDetail = ({album}) =>{
const   imgpath = album.imgpath;
const book_name = album.book_name;
const url = album.link;
//console.log("URL in SQLITE ",url)
const {thumbnailContainerStyle,thumbnailStyle,headerContentStyle,headerTextStyle,imageStyle} = styles;

    return (
        <TouchableOpacity
         style={styles.button}
         onPress={() => navigate('First', {name: 'Jane'})}
       >
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}> 
                <Image style={imageStyle} source= {{uri: imgpath}}/>
                <Text>{book_name}</Text>
                </View>
            </CardSection>
        </Card>
        </TouchableOpacity>
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
        marginLeft:2,
        marginRight:2

    },
    imageStyle : {
        height : 150,
        flex : 1,
        width:100
    }
};

export default AlbumDetail;