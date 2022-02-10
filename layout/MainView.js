import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from "react-native"

const MainView = ( { children, date = 'Día 0 de Mes de 2022' } ) => {
    return (

        <View style={ styles.container } >
            <Text style={ styles.currentDate }>{ date }</Text>
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