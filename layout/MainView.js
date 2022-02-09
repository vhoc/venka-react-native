import { StyleSheet, View, Text } from "react-native"

const MainView = ( { children, date = 'Día 0 de Mes de 2022' } ) => {

    return (

        <View style={ styles.container } >
            <Text>{ date }</Text>
            { children }
        </View>

    )

}

export default MainView

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        top: '90px',
        width: '100vw',
        padding: '1rem',
        gap: '1rem',
    }
})