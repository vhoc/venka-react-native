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

  

  // Get ventas and meta of all 'empresas' belonging to the specified user.
  const fetchAll = async ( idUsuario, column ) => {

    let empresasArray = []
    let empresasData = []

    // Get all 'empresas' belonging to the user.
    try {
      const response = await axios.get(
        `${apiUrl}/usuario-empresas/${idUsuario}`,
        {
          headers: {
            Authorization: token,
            Accept: 'application/json',
          },
        },
      )
      
      const empresas = await response.data
      //console.log( empresas )
      empresas.forEach( (empresa) => {
        empresasArray.push( empresa.id )
      } )
      //setUsuarioEmpresas( tempArray )
      //console.log(empresasArray)
      //setIsLoadingEmpresas( false )
    } catch ( error ) {
      console.warn( error )
    }

    empresasArray.forEach( async empresa => {
      try {
        const response = await axios.post( `${apiUrl}/ventameta/`, {
          id_empresa: empresa,
          fecha_inicial: selectedDate,
          column: column,
        },
        {
          headers: {
            Authorization: token,
            Accept: 'application/json',
          }
        } ).then( response => {
          //console.log( response.data )
          empresasData.push( response.data )
          setIsLoading( false )
          console.log('allData changed!')
        } )
        
        //return await response.data
      } catch ( error ) {
        console.warn(error)
      }
    } )
    console.log( empresasData )
    setAllData( ...allData, empresasData )
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
    fetchAll( idUsuario, 'vta_tuno_open' )
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
  return (

    <View>

      <Shadow
        distance={5}
        startColor={'#00000010'}
        radius={8}
        viewStyle={styles.container}
      >

        <BlockHeader icon={icon} title={title} helpText={helpText} />
        <Button title="Test" onPress={ () => {
          setCount(count+1)
        } } />
        {
          isLoading || allData.length < 1 ? (
            <Text>Loading...</Text>
          ): ( 
            <View>              
              {
                allData.length > 0 ? (
                    
                    allData.map( (data, index) => (
                        <GaugeBar
                            key={index}
                            idEmpresa={data.id_emp}
                            currentValue={data.venta[0].vta_tuno_open}
                            limitValue={data.meta}
                            height={48}
                        />
                    )

                )
                ) : (
                    <Text>No se obtuvieron datos</Text>
                )
            }
            </View>
          )
        }

      </Shadow>

    </View>

  )
}

export default GlobalVentaTotal
