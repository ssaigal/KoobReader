import {createStackNavigator, createAppContainer} from 'react-navigation';
import Reader from '../Reader'
import AlbumList from './AlbumList';

const MainNavigator = createStackNavigator({
    AlbumList: {screen: AlbumList},
    Reader: {screen: Reader},
  });

const Navigator = createAppContainer(MainNavigator);

export default Navigator;

