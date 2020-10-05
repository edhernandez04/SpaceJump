import React, {useState} from 'react';
import { View, TextInput, Button, Text } from 'react-native'

const Menu = props => {
    const [name, changeName] = useState('')
    return (
        <View>
            <Text>MENU PAGE</Text>
            <TextInput value={name} onChangeText={changeName} placeholder='NAME' />
            <Button title='GAME' onPress={() =>
                props.navigation.navigate('Game')
            }/>
        </View>
    )
}

export default Menu