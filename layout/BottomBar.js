import { View, Text, StyleSheet, Button } from 'react-native'

const BottomBar = ( { dateSetActual, dateSetAnterior } ) => {

    return (
        <View style={ styles.container }>
            
            <View style={ styles.topRow } >

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
    bottomRow: {
        display: 'flex',
        flexDirection: 'row'
    }
})