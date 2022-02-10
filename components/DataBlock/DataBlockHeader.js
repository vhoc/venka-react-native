import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppLoading from "expo-app-loading";
import {
    useFonts,
    RobotoCondensed_400Regular,
  } from '@expo-google-fonts/roboto-condensed'

const DataBlockHeader = ( { icon, title, helpText = '' } ) => {

    let [ fontsLoaded ] = useFonts({
        RobotoCondensed_400Regular,
    })

    const handleHelpButton = () => {
        alert( helpText )
    }

    if ( ! fontsLoaded ) {
        return <AppLoading />
    } else {
        return (

            <View style={ styles.container }>
    
                <FontAwesome5 name={ icon } size={25} color="#494949"/>
    
                <Text style={ styles.headerTitle }>{ title } </Text>
    
                {
                    /**
                     * If there's no help text, don't show the Help Icon that triggers the help modal.
                     */
                    !! helpText &&
                        <TouchableOpacity onPress={ handleHelpButton } style={ styles.helpIcon }>
                            <FontAwesome5 name={ 'question-circle' } size={20} color="#494949" />
                        </TouchableOpacity>
                }
    
            </View>
    
        )
    }

    

}

export default DataBlockHeader

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'start',
        gap: '0.5rem',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '1.4em',
        fontFamily: 'RobotoCondensed_400Regular',
        textTransform: 'uppercase',
        color: '#494949',
    },
    helpIcon: {
        marginLeft: 'auto',
    }
})