import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from '../assets/Images';

export default class Hazard extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const hazardHeight = 0.4 * height;
    const hazardIterations = Math.ceil(height / hazardHeight);
    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'column',
        }}>
        {Array.apply(null, Array(hazardIterations)).map((element, index) => {
          return (
            <Image
              style={{ width: width, height: hazardHeight }}
              key={index}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/astroids.png?alt=media&token=52ee01e9-440b-4462-9315-c23ca527b17f' }}
              resizeMode="stretch"
            />
          );
        })}
      </View>
    );
  }
}
