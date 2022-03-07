import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from "react-native"
import * as Progress from 'react-native-progress'
import {
    useFonts,
    RobotoCondensed_400Regular,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_700Bold_Italic,
  } from '@expo-google-fonts/roboto-condensed'

const GaugeBar = ( { title, currentValue, limitValue, height } ) => {

    const [ curValue, setCurValue] = useState( currentValue ? currentValue.replace(/,/g, '.') : '0' )
    const [ limValue, setLimValue] = useState( limitValue ? limitValue.replace(/,/g, '.') : '0' )

    const [ progress, setProgress ] = useState(0.0)
    
    let [ fontsLoaded ] = useFonts({
        RobotoCondensed_400Regular,
        RobotoCondensed_300Light_Italic,
        RobotoCondensed_700Bold_Italic
    })
    
    useEffect( () => {
        if ( curValue && limValue ) {
            setProgress( curValue / limValue );
        }
    }, [] )

    return (

        <View style={ styles.container }>

            <View style={ styles.title }>
                <Text style={ styles.titleText }>{ title }</Text>
            </View>

            <View style={ styles.body }>

                <View style={ styles.barContainer }>
                    <Progress.Bar
                        progress={progress}
                        width={null}
                        height={height}
                        borderRadius={25}
                        borderWidth={0}
                        color={ limitValue == 0 ? `#535353` : `#73b73e` }
                        unfilledColor={'#535353'}
                    />

                    <View style={ styles.barCaptionsContainer }>
                        <Text style={ [styles.barCaption, styles.barCaptionCurrent] }>{`$${ Math.round(curValue).toLocaleString() }`}</Text>
                        {
                            limValue !== '0' ?
                                <Text style={ [styles.barCaption, styles.barCaptionLimit] }>{`Meta: $${ Math.round(limValue).toLocaleString() }`}</Text>
                                :
                                <Text style={ styles.barCaption }>No hay registro de metas</Text>
                        }
                        
                    </View>
                    
                </View>                

                {
                    limValue !== '0' ?
                        <Text style={ styles.percent }>{ Math.round(progress * 100) }%</Text>
                        :
                        <></>
                }

            </View>

        </View>

    )

}

export default GaugeBar

const styles = StyleSheet.create( {
    container: {
        display: 'flex',
        alignItems: 'stretch',
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
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed_400Regular',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    barContainer: {
        flexGrow: 1,
    },
    barCaptionsContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '1rem',
    },
    barCaption: {
        fontFamily: 'RobotoCondensed_700Bold_Italic',
        color: '#ffffff',
    },
    barCaptionCurrent: {
        fontSize: 26,
    },
    barCaptionLimit: {
        fontSize: 16,
        fontFamily: 'RobotoCondensed_300Light_Italic'
    },
    percent: {
        fontFamily: 'RobotoCondensed_300Light_Italic,',
        fontStyle: 'italic',
        fontSize: 24,
        color: '#535353',
        textAlign: 'right',
        marginLeft: 8,
    },
} )