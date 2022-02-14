import { StyleSheet, View, Text } from "react-native"
import BlockHeader from "./BlockHeader"
import { Shadow } from "react-native-shadow-2"
import { useEffect, useState } from "react"
import GaugeBar from './GaugeBar';
import axios from "axios";
import * as Progress from 'react-native-progress'

const GlobalVentaTotal = ( { 
  idUsuario,
  selectedDate,
  selectedDateLimit = selectedDate,
  title = '',
  helpText,
  icon,
  width = '100%',
  height = 'auto'
} ) => {

    const [ isLoading, setIsLoading ] = useState( true )
    const [ viewWidth, setViewWidth ] = useState(window.innerWidth)
    const [ blockWidth, setBlockWidth ] = useState(window.innerWidth)
    const [ usuarioEmpresas, setUsuarioEmpresas ] = useState([])
    const [ dataSet, setDataSet ] = useState([])
    const [ metaSet, setMetaSet ] = useState([])
    const [ allData, setAllData ] = useState([])

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
        }
    })

  /**
   * Get all of the user's Empresas.
   */
  useEffect( () => {

    const fetchUsuarioEmpresas = async () => {
      try {
        const response = await axios.get( `${apiUrl}/usuario-empresas/${idUsuario}`, {
          headers: {
            'Authorization': token,
            'Accept': 'application/json',
          }
        } )
        setUsuarioEmpresas( await response.data )
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsuarioEmpresas()


  }, [idUsuario] )

  /**
   * Fill DataSet
   */
  useEffect( async () => {

    const fetchData = async ( idEmpresa, columnName ) => {
      try {
        const response = await axios.get( `${ apiUrl }/datalive/${ idEmpresa }/${ columnName }`, {
          headers: {
            'Authorization': token,
          }
        } )
        const preValue = await response.data

        // Fix to prevent problems when receiving a comma ',' for decimal separator instead of a dot '.'
        const parsed = parseFloat( preValue.replace(',', '.').replace(' ', '') )

        const value = Number(parsed)
        return value
      } catch ( error ) {
        console.log(error)
      }
    }

    const fetchMeta = async( idEmpresa, date, limitDate = null ) => {
      try {

        if ( limitDate === null || !(limitDate === date) ) {

          const response = await axios.post( `${ apiUrl }/meta/rango/`,{
            id_empresa: idEmpresa,
            fecha_inicial: date,
            fecha_final: limitDate,
          }, {
            headers: {
              'Authorization': token,
            }
          } )

          const value = await response.data
          console.log(value)
          return value

        } else {

          const year = date.getFullYear()
          const month = date.getMonth()
          const day = date.getDay()

          const response = await axios.get( `${ apiUrl }/meta/${ idEmpresa }/${ year }/${ month }/${ day }`, {

            headers: {
              'Authorization': token,
            }
          } )

          const value = await response.data[0]        
          console.log(value)        
          return value
        }
      } catch (error) {
        console.log(error)
      }
    }

    usuarioEmpresas.map( usuarioEmpresa => {

      fetchData( usuarioEmpresa.id, 'vta_tuno_open' ).then( data => {
        //console.log( data )
        setDataSet( dataSet => [...dataSet, {
          idEmpresa: usuarioEmpresa.id,
          nombreEmpresa: usuarioEmpresa.nomcom_emp,
          ventaTotal: data,
       }] )
      })

      fetchMeta( usuarioEmpresa.id, selectedDate, selectedDateLimit ).then( data => {
        
        setMetaSet( metaSet => [...metaSet, {
          idEmpresa: usuarioEmpresa.id,
          fecha: data.fecha,
          meta: Number(data.meta),
        }] )   

      })

      setIsLoading(false)
      
    } )   

  }, [idUsuario, usuarioEmpresas, selectedDate, selectedDateLimit] )
  
  // DEBUG
  useEffect( async () => {
    //console.log( dataSet )
    //console.log( metaSet )

    const mergeData = async (arr1, arr2) => {

      const array1 = await arr1
      const array2 = await arr2

      return array1.map( (item, i) => {
        if ( item.idEmpresa === array2[i].idEmpresa ) {
          return Object.assign({}, item, array2[i])
        }
      } )
    }

    const merged = await mergeData( dataSet, metaSet )
    //console.log( merged )
    setAllData( merged )

    
  }, [metaSet] )

  /**
   * Responsiveness
   */
  useEffect( () => {

      const handleResize = () => {
          setViewWidth( window.innerWidth )
      }

      window.addEventListener( 'resize', handleResize )

  } )

  useEffect( () => {

      if ( viewWidth >= 0 && viewWidth <=479 ) setBlockWidth( 320 )

      if ( viewWidth >= 480 && viewWidth <= 767 ) setBlockWidth( 480 )

      if ( viewWidth >= 768 ) setBlockWidth( 480 )

  }, [viewWidth] )

  return (
      <Shadow distance={5} startColor={'#00000010'} radius={8} viewStyle={ styles.container }>
          <View>

              <BlockHeader icon={ icon } title={ title } helpText={ helpText }/>

              {
                isLoading === true ? (
                  <>
                      <Text style={ styles.loadingText }>Cargando...</Text>
                      <Progress.Bar animated indeterminate color="#73b73e" borderColor="#73b73e" width={null}/>
                  </>
                ) : (
                  allData.map( data => {

                    if ( data ) {
                      //console.log( data )
                      return (
                        <GaugeBar
                          key={ data.idEmpresa }
                          idEmpresa={ data.idEmpresa }
                          currentValue={ data.ventaTotal }
                          limitValue={ data.meta }
                          height={ 48 }
                        />
                      )
                    }
                    
                  } )
                  
                )
                
              }
          </View>
      </Shadow>

  )

}

export default GlobalVentaTotal