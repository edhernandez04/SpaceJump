import React from 'react'
import {View, Image, Text} from 'react-native'
import Images from '../assets/Images'

const ShipSelector = () => {
    return (
        <View>
            <Image source={Images.plane3} style={{height: 50, width: 100}}/>
        </View>
    )
}

export default ShipSelector