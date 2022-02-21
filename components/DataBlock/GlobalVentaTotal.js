import { StyleSheet, View, Text } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState, useRef } from 'react'
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

  const [blockWidth, setBlockWidth] = useState(window.innerWidth)
  const viewWidth = useRef(window.innerWidth)
  const [allData, setAllData] = useState([])

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

  const fetchAll = async ( idUsuario, column ) => {
    try {
      const body = { user_id: idUsuario, fecha_inicial: selectedDate, column: column }
      const headers = { headers: { Authorization: token, Accept: 'applicaton/json' } }
      const response = await axios.post( `${apiUrl}/user/ventatotal/`, body, headers )
      return response.data
    } catch ( error ) {
      console.warn( `newFetchAll - Error cuando se hace post: ${error}` )
      return []
    }
    

  }

  /**
   * Responsiveness
   */
  useEffect(() => {
    const handleResize = () => {
      //setViewWidth(window.innerWidth)
      viewWidth.current = window.innerWidth
    }

    window.addEventListener('resize', handleResize)

    if (viewWidth.current >= 0 && viewWidth.current <= 479) setBlockWidth(320)

    if (viewWidth.current >= 480 && viewWidth.current <= 767) setBlockWidth(480)

    if (viewWidth.current >= 768) setBlockWidth(480)
  }, [viewWidth.current])
  
  
  useEffect(async () => {    
    //const empresas = await fetchAll( idUsuario, 'vta_tuno_open' )
    const empresas = await fetchAll( idUsuario, 'vta_tuno_open' )
    setAllData(...allData, empresas)
    console.log(empresas)
    setIsLoading(false)
    
  }, [idUsuario] )
  
  const renderComponent = () => {
    if (isLoading) {
      return <Text>Loading...</Text>
    } else {
      return (
        <View>              
              {                    
                allData.map( (data, index) => {
                  console.log(`imprimiendo JSX, con estado: ${allData}`);
                  return (<GaugeBar
                      key={index}
                      idEmpresa={data.id_emp}
                      currentValue={data.venta}
                      limitValue={data.meta}
                      height={48}
                    />)
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
        {
            renderComponent()
        }
      </Shadow>

    </View>

  )
}

export default GlobalVentaTotal
