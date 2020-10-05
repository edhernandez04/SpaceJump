import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import Images from '../assets/Images'

const ShipSelector = () => {
    return (
        <View style={styles.selectorContainer}>
            <Image source={Images.plane3} style={{height: 50, width: 100}}/>
            <Image source={Images.plane3} style={{height: 50, width: 100}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    selectorContainer: {
        margin: 20
    }
})

export default ShipSelector