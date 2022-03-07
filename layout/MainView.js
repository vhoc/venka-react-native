import React from 'react'
import { StyleSheet, View, Text } from "react-native"

const MainView = ( { children } ) => {
    return (

        <View style={ styles.container } >
            { children }
        </View>

    )

}

export default MainView

const styles = StyleSheet.create({
    currentDate: {
        width: '100%',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top: 90,
        paddingBottom: 125,
        width: '100%',
        padding: 16,
        margin: 16,
    }
})