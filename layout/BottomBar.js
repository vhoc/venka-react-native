import { View, StyleSheet, Button } from 'react-native'
import { useState } from 'react'

const BottomBar = ( { dateSetActual, dateSetAnterior, periodDay, periodMonth, periodWeek, periodYear } ) => {

    

    return (
        <View style={ styles.container }>
            
            <View style={ styles.topRow } >
                <Button onPress={ periodDay } title="Día" />
                <Button onPress={ periodWeek } title="Semana" />
                <Button onPress={ periodMonth } title="Día" />
                <Button onPress={ periodYear } title="Año" />
            </View>

            <View style={ styles.bottomRow } >
                <Button onPress={ dateSetActual } title="Actual"/>
                <Button onPress={ dateSetAnterior } title="Anterior"/>
            </View>

            
        </View>
    )

}

export default BottomBar

const styles = StyleSheet.create({
    container: {
        width: '100vw',
        minWidth: '320px',
        height: '115px',
        display: 'flex',
        backgroundColor: '#73b73e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'fixed',
        bottom: '0px',
        zIndex: 9999,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    bottomRow: {
        display: 'flex',
        flexDirection: 'row'
    }
})