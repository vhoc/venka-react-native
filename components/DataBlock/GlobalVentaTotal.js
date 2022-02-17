import { StyleSheet, View, Text } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState } from 'react'
import GaugeBar from './GaugeBar'
import axios from 'axios'
import * as Progress from 'react-native-progress'

const GlobalVentaTotal = ({
  idUsuario,
  selectedDate,
  selectedDateLimit = selectedDate,
  title = '',
  helpText,
  icon,
  width = '100%',
  height = 'auto',
}) => {

  const [isLoading, setIsLoading] = useState(true)
  //const [viewWidth, setViewWidth] = useState(window.innerWidth)
  const [blockWidth, setBlockWidth] = useState(window.innerWidth)

  //const [usuarioEmpresas, setUsuarioEmpresas] = useState([])
  //const [allDa, setVentasData] = useState([])

  const [allData, setAllData] = useState([])

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

  const fetchAll = async ( column ) => {

    try {
      const response = await axios.post( `${apiUrl}/ventameta/`, {
        id_empresa: 1,
        fecha_inicial: selectedDate,
        column: column,
      },
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
        }
      } )
      
      setAllData( await response.data )
      setIsLoading( false )
    } catch ( error ) {
      console.warn(error)
    }

  }

  /**
   * Responsiveness
   */
  /*
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    if (viewWidth >= 0 && viewWidth <= 479) setBlockWidth(320)

    if (viewWidth >= 480 && viewWidth <= 767) setBlockWidth(480)

    if (viewWidth >= 768) setBlockWidth(480)
  }, [idUsuario])
  */
  
  useEffect( () => {
    
    fetchAll( 'vta_tuno_open' )

  }, [] )

  // poner setLoading a false
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
          isLoading ? (
            <Text>Loading...</Text>
          ): ( 
            <View>
              <GaugeBar
                idEmpresa={allData.id_emp}
                currentValue={allData.venta[0].vta_tuno_open}
                limitValue={allData.meta}
                height={48}
              />
            </View>
          )
        }

      </Shadow>

    </View>

  )
}

export default GlobalVentaTotal
