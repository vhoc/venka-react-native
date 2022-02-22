import { View, Text, StyleSheet, Button } from 'react-native'

const BottomBar = ( { children, dateSetAnterior } ) => {

    return (
        <View style={ styles.container }>
            { children }
            {/*<Button onPress={ dateSetAnterior } title="Anterior"/>*/}
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
})