import { StyleSheet, View, Text, Button } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState, useRef } from 'react'
import GaugeBar from './GaugeBar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GlobalVentaTotal = ({
  idUsuario,
  toggleSwitch,
  title = '',
  helpText,
  icon,
  width = '100%',
  height = 'auto',
}) => {
  const [blockWidth, setBlockWidth] = useState(window.innerWidth)
  const viewWidth = useRef(window.innerWidth)
  const [allData, setAllData] = useState([
    {
      fecha_inicial: toggleSwitch.startDate,
      fecha_final: toggleSwitch.endDate,
      id_emp: 0,
      nombre_emp: '',
      ventas: {
        vta_tuno_open: '0',
        vta_dia_1: '0',
        vta_sem_0: '0',
        vta_sem_1: '0',
        vta_mes_0: '0',
        vta_mes_1: '0',
        vta_anio_0: '0',
      },
      metas: {
        dia: '0',
        semana: '0',
        mes: '0',
        año: '0',
        dia_anterior: '0',
        semana_anterior: '0',
        mes_anterior: '0',
        año_anterior: '0',
      },
    },
  ])
  const [storedData, setStoredData] = useState([
    {
      fecha_inicial: toggleSwitch.startDate,
      fecha_final: toggleSwitch.endDate,
      id_emp: 0,
      nombre_emp: '',
      ventas: {
        vta_tuno_open: '0',
        vta_dia_1: '0',
        vta_sem_0: '0',
        vta_sem_1: '0',
        vta_mes_0: '0',
        vta_mes_1: '0',
        vta_anio_0: '0',
      },
      metas: {
        dia: '0',
        semana: '0',
        mes: '0',
        año: '0',
        dia_anterior: '0',
        semana_anterior: '0',
        mes_anterior: '0',
        año_anterior: '0',
      },
    },
  ])

  let styles = StyleSheet.create({
    container: {
      width: width,
      minWidth: blockWidth,
      //maxWidth: '450px',
      height: height,
      padding: '0.7rem',
      paddingTop: '0.3rem',
      border: '1px solid #eeeeee',
      borderRadius: '0.6rem',
    },
    loadingText: {
      color: '#73b73e',
    },
  })

  const [startDate, setStartDate] = useState(toggleSwitch.startDate)
  const [endDate, setEndDate] = useState(toggleSwitch.endDate)

  const [isLoading, setIsLoading] = useState(true)

  const apiUrl = 'https://venka.app/api'
  const token = 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid'

  // Stores data into "Local Storage"
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('data', jsonValue)
      setAllData( value )
    } catch ( error ) {
      console.warn( error )
    }
  }

  // Reads data from "Local Storage"
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch ( error ) {
      console.warn( error )
    }
  }

  const fetchAll = async (idUsuario, column, startDate, endDate) => {
    console.log( `fetchAll: ${column}` )
    try {
      const body = {
        user_id: idUsuario,
        fecha_inicial: startDate,
        fecha_final: endDate,
        column: column,
      }
      const headers = {
        headers: { Authorization: token, Accept: 'applicaton/json' },
      }
      const response = await axios.post(
        `${apiUrl}/user/globalVentaTotal/`,
        body,
        headers,
      )
      //storeData( response.data )
      return response.data
    } catch (error) {
      console.warn(`Error al obtener datos: ${error}`)
      return []
    }
  }

  /**
   * #1 useEffect()
   * Fetch data from the API into AsyncStorage
   * On first render
   */
  useEffect( async () => {
    const empresas = await fetchAll(
      idUsuario,
      toggleSwitch.startDate,
      toggleSwitch.endDate,
    )

    storeData( empresas )
    setStoredData( empresas )

    // Refresh every x seconds
    const interval = setInterval( async () => {
      const empresas = await fetchAll(
        idUsuario,
        toggleSwitch.startDate,
        toggleSwitch.endDate,
      )
  
      storeData( empresas )
      setAllData(empresas)
      setStoredData( await getData() )
    }, 30000 )

    return () => clearInterval(interval)
  }, [] )

  /**
   * Screen Adaptiveness
   */
  useEffect(() => {
    const handleResize = () => {
      viewWidth.current = window.innerWidth
    }
    window.addEventListener('resize', handleResize)
    if (viewWidth.current >= 0 && viewWidth.current <= 479) setBlockWidth(320)
    if (viewWidth.current >= 480 && viewWidth.current <= 767) setBlockWidth(480)
    if (viewWidth.current >= 768) setBlockWidth(480)
  }, [viewWidth.current])

  /**
   * Obtain data and update state.
   */
  useEffect(async () => {
    setIsLoading(true)
    setStartDate(toggleSwitch.startDate)
    setEndDate(toggleSwitch.endDate)

    let column = ''
    switch ( toggleSwitch.range ) {
      case 'day':
        toggleSwitch.period === 'current' ? column = 'vta_tuno_open' : column = 'vta_dia_1'
        break;
      
      case 'week':
        toggleSwitch.period === 'current' ? column = 'vta_sem_0' : column = 'vta_sem_1'
        break;

      case 'month':
        toggleSwitch.period === 'current' ? column = 'vta_mes_0' : column = 'vta_mes_1'
        break;

      case 'year':
        toggleSwitch.period === 'current' ? column = 'vta_anio_0' : column = 'vta_anio_1'
        break;
    }
    console.log(`useEffect: ${column}`)
    const empresas = await fetchAll(
      idUsuario,
      column,
      toggleSwitch.startDate,
      toggleSwitch.endDate,
    )

    setAllData(empresas)
    setIsLoading(false)
  }, [toggleSwitch])

  /**
   * Elements to be rendered
   */
  const renderComponent = () => {
    if (isLoading) {
      return <View></View>
    } else {
      return (
        <View>
          {
            storedData.map((data, index) => {
              return (
                <GaugeBar
                  key={index}
                  idEmpresa={data.id_emp}
                  title={data.nombre_emp}
                  currentValue={data.ventas.vta_tuno_open.replace(/,/g, '.')}
                  limitValue={data.metas.dia.replace(/,/g, '.')}
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
