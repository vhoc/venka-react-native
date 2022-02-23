import { StyleSheet, View, Text, Button } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState, useRef } from 'react'
import GaugeBar from './GaugeBar'
import axios from 'axios'

const GlobalVentaTotal = ({ idUsuario, selectedDate, selectedDateLimit, title = '', helpText, icon, width = '100%', height = 'auto'}) => {

  const [blockWidth, setBlockWidth] = useState(window.innerWidth)
  const viewWidth = useRef(window.innerWidth)
  const [allData, setAllData] = useState([
    {
      id_emp: 0,
      fecha_inicial: selectedDate,
      fecha_final: selectedDateLimit,
      nombre_emp: '',
      venta: 0,
      meta: 0,
    },
  ])

  const [ startDate, setStartDate ] = useState(selectedDate)
  const [ endDate, setEndDate ] = useState(selectedDateLimit)

  const [isLoading, setIsLoading] = useState(true)

  const apiUrl = 'https://venka.app/api'
  const token = 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid'

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

  const dateSetAnterior = () => {
    setStartDate( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return newDate.toISOString().slice(0, 10)
    })
    setEndDate( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return newDate.toISOString().slice(0, 10)
    } )
    setIsLoading(true)
  }

  const dateSetActual = () => {
    setStartDate( () => {
      const newDate = new Date()
      return newDate.toISOString().slice(0, 10)
    })
    setEndDate( () => {
      const newDate = new Date()
      return newDate.toISOString().slice(0, 10)
    } )
  }

  const fetchAll = async ( idUsuario, column ) => {
    try {
      const body = { user_id: idUsuario, fecha_inicial: startDate, fecha_final: endDate, column: column }
      const headers = { headers: { Authorization: token, Accept: 'applicaton/json' } }
      const response = await axios.post( `${apiUrl}/user/ventatotal/`, body, headers )
      return response.data
    } catch ( error ) {
      console.warn( `Error al obtener datos: ${error}` )
      return []
    }
  }

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
    if ( isLoading ) {
      const empresas = await fetchAll( idUsuario, 'vta_tuno_open' )
      setAllData(empresas)
      setIsLoading(false)
    }
    
  }, [isLoading] )

  /**
   * Elements to be rendered
   */
  const renderComponent = () => {
    if (isLoading) {
      return (
        <View>
          
        </View>
      )
    } else {
      return (
        <View>
          {
            allData.map( (data, index) => {
              return (<GaugeBar
                  key={index}
                  idEmpresa={ data.id_emp }
                  title={ data.nombre_emp }
                  dataColumn={ `vta_tuno_open` }
                  startDate={ startDate }
                  endDate={ endDate }
                  height={42}
                />)
            }) //END-MAP
          }
        </View>
      )
    }
  }

  /**
   * Update dates states on props change
   */
  //useEffect( dateSetAnterior, [selectedDate, selectedDateLimit] )
  //useEffect( dateSetActual, [selectedDate, selectedDateLimit] )

  return (
    <View>
      <Shadow
        distance={5}
        startColor={'#00000010'}
        radius={8}
        viewStyle={styles.container}
      >
        <BlockHeader icon={icon} title={title} helpText={helpText} />
        {
            renderComponent()
        }
      </Shadow>
    </View>

  )
}

export default GlobalVentaTotal
