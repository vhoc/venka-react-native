import { View, Text, StyleSheet } from 'react-native'

const BottomBar = () => {

    return (
        <View style={ styles.container }>
            <Text>Bottom Bar</Text>
        </View>
    )

}

export default BottomBar

const styles = StyleSheet.create({
    container: {
        width: '100vw',
        height: '115px',
        display: 'flex',
        backgroundColor: '#73b73e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'fixed',
        bottom: '0px',
    },
})