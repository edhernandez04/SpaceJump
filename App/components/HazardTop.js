import React, { Component } from 'react';
import { Image } from 'react-native';
import Images from '../assets/Images';

export default class HazardTop extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
        }}
        resizeMode='stretch'
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/hazardTop.png?alt=media&token=0dc756b3-3a3c-495b-b6be-5fff2147f647' }}
      />
    );
  }
}
