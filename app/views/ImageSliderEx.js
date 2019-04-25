import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';

class ImageSliderEx extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          url: props.img[0],
        }, {
          url: props.img[1],
        }, {
          url: props.img[2],
        },
      ],
    };
  }
 
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
 
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
 
  render() {
    return (
    <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />
    );
  }
}

export default ImageSliderEx;