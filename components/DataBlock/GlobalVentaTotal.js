import { StyleSheet, View, Text, Button } from 'react-native'
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

  const [blockWidth, setBlockWidth] = useState(window.innerWidth)
  const [allData, setAllData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [count, setCount] = useState(0)

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

  const fetchEmpresasDeUsuario = async () => {
    try {
      // Get all 'empresas' belonging to the user.
      const endPoint = `${apiUrl}/usuario-empresas/${idUsuario}`
      const headers = { headers: { Authorization: token, Accept: 'application/json' } }

      const response = await axios.get(endPoint,headers)
      return  response.data
    } catch ( error ) {
      console.warn(`fetchEmpresasDeUsuario - Error tratando de obtener las empresas del usuario: ${error}`)
      return []
    }
  }

  // Get ventas and meta of all 'empresas' belonging to the specified user.
  const getIdsEmpresas = (empresaIds) => {
    console.log(`getIdsEmpresas - Empresas: ${empresaIds}`)
    const empresasArray = empresaIds.map( empresa => empresa.id )
    console.log(`getIdsEmpresas - IDs: ${empresasArray}`)
    return empresasArray
  }

  const fetchEmpresasDeseada = async (empresaId, column) => {
    try {
      const body = { id_empresa: empresaId, fecha_inicial: selectedDate, column: column }
      const headers = { headers: { Authorization: token, Accept: 'application/json'} }
      const response = await axios.post( `${apiUrl}/ventameta/`, body ,headers)

      return response
    } catch (error) {
      console.warn(`fetchEmpresaDeseada - Error cuando se hace post: ${error}`);
      return []
    }
      
  }
  const fetchAll = async ( idUsuario, column ) => {

    const empresasDelUsuario = await fetchEmpresasDeUsuario();
    const idsEmpresa = await getIdsEmpresas(empresasDelUsuario)
    const resultEmpresas = []

    idsEmpresa.forEach( async empresaId => {
      try {

        const empresas = await fetchEmpresasDeseada(empresaId, column)
        console.log(`fetchAll forEach -> empresaId: ${empresaId} | Response: ${empresas}`)

        resultEmpresas.push(empresas.data)
      } catch ( error ) {
        console.warn(error)
      }
    })

    return resultEmpresas
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
  
  useEffect(async () => {    
    const empresas = await fetchAll( idUsuario, 'vta_tuno_open' )
    setAllData(...allData, empresas)
    setIsLoading(false)
    setCount(0)
  }, [] )

  
  /*
  useEffect( () => {

    if ( ! isLoadingEmpresas ) {
      let tempArray = []
      usuarioEmpresas.forEach( empresa => {
        tempArray.push( fetchAll( empresa, 'vta_tuno_open' ) )// THIS DOESN'T WORK
        //console.log(empresa)
      })
      
    }

  }, [isLoadingEmpresas] )*/
  
  // poner setLoading a false
  
  const renderComponent = () => {
    if (isLoading) {
      return <Text>Loading...</Text>
    } else {
      return (
        <View>              
              {
                // allData.length < 1 ?  <Text>No se obtuvieron datos</Text> : (
                    
                    allData.map( (data, index) => {
                      console.log(`imprimiendo JSX, con estado: ${allData}`);
                      return (<GaugeBar
                          key={index}
                          idEmpresa={data.id_emp}
                          currentValue={data.venta[0].vta_tuno_open}
                          limitValue={data.meta}
                          height={48}
                        />)
                    }) //END-MAP

                // )
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
        <Button title="Test" onPress={() => {
            setCount(count+1)
          }}
        />
        {
            renderComponent()
        }
      </Shadow>

    </View>

  )
}

export default GlobalVentaTotal
