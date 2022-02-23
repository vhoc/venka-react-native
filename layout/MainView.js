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
        top: '90px',
        paddingBottom: '125px',
        width: '100%',
        padding: '1rem',
        gap: '1rem',
    }
})