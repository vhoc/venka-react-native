import { View, Text, StyleSheet } from 'react-native'

const BottomBar = ( { children } ) => {

    return (
        <View style={ styles.container }>
            { children }
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