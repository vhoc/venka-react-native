import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from "react-native"
import axios from 'axios'
import * as Progress from 'react-native-progress'
import {
    useFonts,
    RobotoCondensed_400Regular,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_700Bold_Italic,
  } from '@expo-google-fonts/roboto-condensed'

const GaugeBar = ( { idEmpresa, currentValue, limitValue, height } ) => {

    const [ progress, setProgress ] = useState(0.0)
    const [ empresa, setEmpresa ] = useState({})
    const apiUrl = 'https://venka.app/api'
    
    let [ fontsLoaded ] = useFonts({
        RobotoCondensed_400Regular,
        RobotoCondensed_300Light_Italic,
        RobotoCondensed_700Bold_Italic
    })    

    useEffect( () => {
        //console.log( data.currentValue )
        setProgress( currentValue / limitValue );
    } )

    useEffect( () => {
        const fetchEmpresa = async () => {
            try {
                const response = await axios.get( `${ apiUrl }/empresa/${ idEmpresa }`, {
                    headers: {
                        'Authorization': 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid',
                        'Accept': 'application/json',
                    }
                } )
                setEmpresa( response.data )
            } catch (error) {
                console.log(error)
            }
            
        }

        fetchEmpresa()
    }, [idEmpresa] )

    return (

        <View style={ styles.container }>

            <View style={ styles.title }>
                <Text style={ styles.titleText }>{ empresa.nomcom_emp }</Text>
            </View>

            <View style={ styles.body }>

                <View style={ styles.barContainer }>
                    <Progress.Bar
                        animated
                        progress={progress}
                        width={null}
                        height={height}
                        borderRadius={25}
                        borderWidth={0}
                        color={`#73b73e`}
                        unfilledColor={'#535353'}
                    />

                    <View style={ styles.barCaptionsContainer }>
                        <Text style={ [styles.barCaption, styles.barCaptionCurrent] }>{`$${ Math.round(currentValue).toLocaleString() }`}</Text>
                        {
                            limitValue || limitValue > 0 ?
                                <Text style={ [styles.barCaption, styles.barCaptionLimit] }>{`Meta: $${ Math.round(limitValue).toLocaleString() }`}</Text>
                                :
                                <Text style={ styles.barCaption }>Meta no asignada</Text>
                        }
                        
                    </View>
                    
                </View>                

                {
                    limitValue || limitValue > 0 ?
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
        textTransform: 'capitalize',
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
        fontSize: '1.618em',
    },
    barCaptionLimit: {
        fontSize: '1em',
        fontFamily: 'RobotoCondensed_300Light_Italic'
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