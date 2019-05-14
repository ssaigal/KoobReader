import React from 'react';
import { View } from 'react-native';

const CardSection = (props) =>{
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle : {
        borderBottomWidth : 1,
        padding: 2,
        backgroundColor : 'grey',
        justifyContent: 'space-between',
        flexDirection : 'row',
        borderColor : '#ddd',
        position : 'relative',
        flexWrap:'wrap'
    }
};

export default CardSection;