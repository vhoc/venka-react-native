import { StyleSheet, View, Text } from "react-native"

const ProgressBar = ( { title, sale, goal} ) => {

    return (

        <View style={ styles.container }>

            <View style={ styles.title }>
                <Text style={ styles.titleText }>{ title }</Text>
            </View>

            <View style={ styles.body }>
                <Text>Barra de Progreso {`${sale}/${goal}`}</Text>
                <Text>Porcentaje</Text>
            </View>

        </View>

    )

}

export default ProgressBar

const styles = StyleSheet.create( {
    container: {
        display: 'flex',
        alignItems: 'space-between',
        width: '100%',
    },
    title: {
        textTransform: 'capitalize',
        textAlign: 'left',
    },
    titleText: {
        fontSize: '1.0em',
        fontWeight: 'bold',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
} )