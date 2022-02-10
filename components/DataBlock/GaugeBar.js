import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from "react-native"
import * as Progress from 'react-native-progress'
import {
    useFonts,
    RobotoCondensed_400Regular,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_700Bold_Italic
  } from '@expo-google-fonts/roboto-condensed'

const GaugeBar = ( { idEmpresa, title, sale, goal, height} ) => {

    const [ progress, setProgress ] = useState(0.0)
    
    let [ fontsLoaded ] = useFonts({
        RobotoCondensed_400Regular,
        RobotoCondensed_300Light_Italic,
        RobotoCondensed_700Bold_Italic
    })

    useEffect( () => {
        setProgress( sale / goal );
    } )

    return (

        <View style={ styles.container }>

            <View style={ styles.title }>
                <Text style={ styles.titleText }>{ title }</Text>
            </View>

            <View style={ styles.body }>
                
                <Progress.Bar
                    style={ styles.progressBar }
                    animated
                    progress={progress}
                    width={null}
                    height={height}
                    borderRadius={25}
                    borderWidth={0}
                    color={`#73b73e`}
                    unfilledColor={'#535353'}
                />               

                <Text style={ styles.percent }>%{ Math.round(progress * 100) }</Text>

            </View>

        </View>

    )

}

export default GaugeBar

const styles = StyleSheet.create( {
    container: {
        display: 'flex',
        alignItems: 'space-between',
        width: '100%',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
    },
    title: {
        textTransform: 'capitalize',
        textAlign: 'left',
        marginLeft: '1rem',
    },
    titleText: {
        fontSize: '1.0em',
        fontWeight: '400',
        fontFamily: 'RobotoCondensed_400Regular',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressBar: {
        flexGrow: 1,
    },
    percent: {
        fontFamily: 'RobotoCondensed_300Light_Italic,',
        fontStyle: 'italic',
        fontSize: '1.5em',
        color: '#535353',
        textAlign: 'right',
        marginLeft: '0.5rem',
    },
} )