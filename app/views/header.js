import React from 'react';
import { Text, View } from 'react-native';
import FilePicker from './FilePicker'

const Header = (props) => {
    const {textStyle, viewStyle} = styles;

    return (
    <View style={viewStyle}>
    <View style={{alignItems:"center"}}>
        <Text style={textStyle}>{props.headerText}</Text>
    </View>
      
      <FilePicker />
    </View>
    );
    
};

const styles = {
    viewStyle :{
        flexDirection:'row',
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems:"center",
        height : 80,
        paddingTop : 30,
        shadowColor: 'white',
        shadowOffset: {width:0, height:5 },
        shadowOpacity: 0.5,
        elevation: 2,
        position:'relative',

    },
    textStyle : {
        color : 'white',
        fontSize : 30,
        fontFamily: 'Iowan Old Style',
        fontWeight:'600',
        alignSelf:"center"
    }
};

export default Header;