import { StyleSheet, View, Text } from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DataBlockHeader = ( { icon, title, helpText = '' } ) => {

    return (

        <View style={ styles.container }>

            <FontAwesome5 name={ icon } size={25} color="#494949"/>

            <Text style={ styles.headerTitle }>{ title } </Text>

            <FontAwesome5 name={ 'question-circle' } size={20} color="#494949" style={styles.helpIcon} />

        </View>

    )

}

export default DataBlockHeader

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        gap: '0.5rem',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '1.3em',
    },
    helpIcon: {
        marginLeft: 'auto',
    }
})