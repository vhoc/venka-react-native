import { StyleSheet, View, Text, Button, Dimensions } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import GaugeBar from './GaugeBar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useLocalStorage from '../../hooks/useLocalStorage'

const GlobalVentaTotal = ({
  idUsuario,
  toggleSwitch,
  title = '',
  helpText,
  icon,
  width = '100%',
  height = 'auto',
}) => {

  const [ blockWidth, setBlockWidth ] = useState(window.innerWidth)
  //const viewWidth = useRef(window.innerWidth)
  const [allData, setAllData] = useState([])
  const [ wWidth, wHeight ] = useWindowSize()

  let styles = StyleSheet.create({
    container: {
      width: width,
      minWidth: blockWidth,
      height: height,
      padding: 8,
      paddingTop: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#eeeeee',
      borderRadius: 12,
    },
    loadingText: {
      color: '#73b73e',
    },
  })

  const [ ventaPropertyName, setVentaPropertyName ] = useState( 'vta_tuno_open' )
  const [ metaPropertyName, setMetaPropertyName ] = useState( 'dia' )
  const [ storedData, setStoredData ] = useLocalStorage( 'data' )
  const [ isLoading, setIsLoading ] = useState(true)

  const apiUrl = 'https://venka.app/api'
  const token = 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid'

  const getStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      if ( jsonValue !== null ) {
        setAllData( JSON.parse(jsonValue) )
        return JSON.parse(jsonValue)
      }
    } catch ( error ) {
      console.warn( error )
    }
  }

  const fetchAll = async (idUsuario, startDate, endDate) => {
    try {
      const body = {
        user_id: idUsuario,
        fecha_inicial: startDate,
        fecha_final: endDate,
      }
      const headers = {
        headers: { Authorization: token, Accept: 'applicaton/json' },
      }
      const response = await axios.post(
        `${apiUrl}/user/globalVentaTotal/`,
        body,
        headers,
      )
      setStoredData( response.data )
      setAllData( response.data )
    } catch (error) {
      console.warn(`Error al obtener datos: ${error}`)
      return []
    }
  }

  // Update data in AsyncStorage from API every x seconds
  useEffect( () => {
    setIsLoading( true )
    fetchAll( idUsuario, toggleSwitch.startDate, toggleSwitch.endDate, )
    setIsLoading( false )

    const interval = setInterval( () => {
      fetchAll( idUsuario, toggleSwitch.startDate, toggleSwitch.endDate, )
    }, 60000 )

    return () => clearInterval( interval )  
      
  }, [] )

  // Update data in allData state from the AsyncStorage every x seconds
  useEffect( async () => {
    const interval2 = setInterval( () => {
      setAllData( storedData )
      setIsLoading(false)
    }, 120000 )

    return () => clearInterval( interval2 )
    
  }, [] )

  // Toggle Switch trigger
  useEffect( () => {
    setAllData( getStoredData() )
  }, [toggleSwitch] )

  /**
   * Screen Adaptiveness
   */
  useEffect(() => {
    if (wWidth >= 0 && wWidth <= 479) setBlockWidth(320)
    if (wWidth >= 480 && wWidth <= 767) setBlockWidth(480)
    if (wWidth >= 768) setBlockWidth(480)
  }, [wWidth])

  /**
   * Toggle Switch Controller
   */  
  useEffect(async () => {
    let ventaProperty = 'vta_tuno_open'
    let metaProperty = 'dia'

    switch ( toggleSwitch.range ) {
      case 'day':
        if ( toggleSwitch.period === 'current' ) {
          ventaProperty = 'vta_tuno_open'
          metaProperty = 'dia'
        } else {
          ventaProperty = 'vta_dia_1'
          metaProperty = 'dia_anterior'
        }
        break;
      
      case 'week':
        if ( toggleSwitch.period === 'current' ){
          ventaProperty = 'vta_sem_0'
          metaProperty = 'semana'
        } else {
          ventaProperty = 'vta_sem_1'
          metaProperty = 'semana_anterior'
        } 
        break;

      case 'month':
        if ( toggleSwitch.period === 'current' ) {
          ventaProperty = 'vta_mes_0'
          metaProperty = 'mes'
        } else {
          ventaProperty = 'vta_mes_1'
          metaProperty = 'mes_anterior'
        }
        break;

      case 'year':
        if ( toggleSwitch.period === 'current' ) {
          ventaProperty = 'vta_anio_0'
          metaProperty = 'año'
        } else {
          ventaProperty = 'vta_anio_1'
          metaProperty = 'año_anterior'
        }
        break;
    }

    setVentaPropertyName( ventaProperty )
    setMetaPropertyName( metaProperty )
  }, [toggleSwitch])
  

  /**
   * Elements to be rendered
   */
  const renderComponent = () => {    
    if (isLoading || !allData.length) {
      return <View></View>
    } else {
      return (
        <View>
          {
            allData.map((data, index) => {
              return (
                <GaugeBar
                  key={index}
                  idEmpresa={data.id_emp}
                  title={data.nombre_emp}
                  currentValue={data.ventas[ventaPropertyName]}
                  limitValue={data.metas[metaPropertyName]}
                  height={42}
                />
              )
            }) //END-MAP
          }
        </View>
      )
    }
  }

  return (
    <View>
      <Shadow
        distance={5}
        startColor={'#00000010'}
        radius={8}
        viewStyle={styles.container}
      >
        <BlockHeader icon={icon} title={title} helpText={helpText} />
        {renderComponent()}
      </Shadow>
    </View>
  )
}



export default GlobalVentaTotal
