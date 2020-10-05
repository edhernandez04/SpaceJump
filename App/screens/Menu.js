import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet, StatusBar } from 'react-native'
import Images from '../assets/Images'
import ShipSelector from '../components/ShipSelector'

const Menu = props => {
    const [name, changeName] = useState('')
    const [ship, selectShip] = useState('')

    return (
        <View style={styles.fullScreenMenu}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.subHeadingText}>Select Your Ship</Text>
            <ShipSelector ship={ship} selectShip={selectShip}/>
            <TextInput value={name} onChangeText={changeName} placeholder='ENTER NAME' placeholderTextColor='white' />
            <Button title='START' onPress={() =>
                props.navigation.navigate('Game')
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    fullScreenMenu: {
        position: 'absolute',
        height: Constants.MAX_HEIGHT,
        width: Constants.MAX_WIDTH,
        flex: 1,
        backgroundColor: 'midnightblue',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subHeadingText: {
        color: 'white',
        fontSize: 24
      },
})

export default Menu