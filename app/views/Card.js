import React from 'react';
import {  View } from 'react-native';

const Card = (props) =>{
    return (
        <View style={styles.containerStyle}> 
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle : {
        borderWidth : 1,
        borderRadius : 2,
        borderColor : '#ddd',
        borderBottomWidth: 0,
        shadowColor: 'white',
        shadowOffset: {width:0, height:5 },
        shadowOpacity: 0.5,
        elevation: 2,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
    }
};

export default Card;