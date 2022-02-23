import { View, StyleSheet, Button } from 'react-native'
import { useEffect, useState } from 'react'

const BottomBar = ( { dateSetActual, dateSetAnterior, periodDay, periodMonth, periodWeek, periodYear } ) => {

    const [ toggleSwitch, setToggleSwitch ] = useState({
        range: 'day',
        period: 'current',
    })

    const handleRangeSwitch = range => {
        setToggleSwitch( toggleSwitch => ({
            ...toggleSwitch,
                range: range,
        }))
    }

    const handlePeriodSwitch = period => {
        setToggleSwitch( toggleSwitch => ({
            ...toggleSwitch,
                period: period,
        }))
    }

    useEffect( () => {
        
    }, [toggleSwitch] )

    return (
        <View style={ styles.container }>
            
            <View style={ styles.topRow } >
                <Button onPress={ () => { handleRangeSwitch('day') } } title="Día" />
                <Button onPress={ () => { handleRangeSwitch('week') } } title="Semana" />
                <Button onPress={ () => { handleRangeSwitch('month') } } title="Mes" />
                <Button onPress={ () => { handleRangeSwitch('year') } } title="Año" />
            </View>

            <View style={ styles.bottomRow } >
                <Button onPress={ () => { handlePeriodSwitch('current') } } title="Actual"/>
                <Button onPress={ () => { handlePeriodSwitch('last') } } title="Anterior"/>
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