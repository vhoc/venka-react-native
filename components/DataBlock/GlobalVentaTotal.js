import { StyleSheet, View, Text } from "react-native"
import BlockHeader from "./BlockHeader"
import { Shadow } from "react-native-shadow-2"
import { useEffect, useState } from "react"
import GaugeBar from './GaugeBar';
import axios from "axios";
import * as Progress from 'react-native-progress'

const GlobalVentaTotal = ( { idUsuario, title = '', helpText, icon, width = '100%', height = 'auto' } ) => {

    const [ isLoading, setIsLoading ] = useState( true )
    const [ viewWidth, setViewWidth ] = useState(window.innerWidth)
    const [ blockWidth, setBlockWidth ] = useState(window.innerWidth)
    const [ usuarioEmpresas, setUsuarioEmpresas ] = useState([])
    const [ dataSet, setDataSet ] = useState([])
    const [ metaSet, setMetaSet ] = useState([])

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
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsuarioEmpresas()


  }, [] )

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

    const fetchMeta = async( idEmpresa, año, mes, dia ) => {
      try {
        const response = await axios.get( `${ apiUrl }/meta/${idEmpresa}/${año}/${mes}/${dia}`, {
          headers: {
            'Authorization': token,
          }
        } )
        const value = await response.data[0]
        console.log(value)
        return value
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

      fetchMeta( usuarioEmpresa.id, '2022', '02', '11' ).then( data => {
        //console.log( data )
        setMetaSet( metaSet => [...metaSet, {
          idEmpresa: usuarioEmpresa.id,
          fecha: data.fecha,
          meta: data.meta,
       }] )
      })

    } )

  }, [usuarioEmpresas] )

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
                ! isLoading ? (
                  dataSet.map( (data) => {
                    return (
                      <GaugeBar
                        title={data.nombreEmpresa}
                        key={data.idEmpresa}
                        idEmpresa={data.idEmpresa}
                        height={48}
                        currentValue={ data.ventaTotal }
                        limitValue={ 0 }
                      />
                    )
                  } )
                ) : (
                  <>
                      <Text style={ styles.loadingText }>Cargando...</Text>
                      <Progress.Bar animated indeterminate color="#73b73e" borderColor="#73b73e" width={null}/>
                  </>
                )
                
              }
          </View>
      </Shadow>

  )

}

export default GlobalVentaTotal