import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from '../assets/Images';

export default class Floor extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageRepeater = Math.ceil(width / height)

    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'row'
        }}>
        {Array.apply(null, Array(imageRepeater)).map((element, index) => {
          return <Image style={{ width: height, height: height }} key={index} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/floor.png?alt=media&token=d32f695f-b31b-4d92-899e-01715f308ad2' }} />
        })}
      </View>
    );
  }
}
