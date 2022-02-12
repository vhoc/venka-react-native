import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import ProgressBlock from './components/DataBlock/GlobalVentaTotal';
import BottomBar from './layout/BottomBar';
import MainView from './layout/MainView';
import TopBar from './layout/TopBar';
import GaugeBar from './components/DataBlock/GaugeBar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {

  const [ usuario, setUsuario ] = useState()
  const [ usuarioEmpresas, setUsuarioEmpresas ] = useState([])
  const [ usuarioEmpresasData, setUsuarioEmpresasData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const apiUrl = 'https://venka.app/api'

  const fetchUsuarioEmpresasData = async idEmpresa => {      

    try {
      const response = await axios.get( `${apiUrl}/datalive/${idEmpresa}`, {
        headers: {
          'Authorization': 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid',
          'Accept': 'application/json',
        }
      } )
      
      return await response.data
    
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * Get User
   */
  useEffect( () => {
    const fetchUsuario = async idUser => {
      try {
        const response = await axios.get( `${apiUrl}/usuario/${idUser}`, {
          headers: {
            'Authorization': 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid',
            'Accept': 'application/json',
          }
        } )
        setUsuario( response.data )
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchUsuario( 5 )

  }, [] )

  /**
   * Get all of the user's Empresas.
   */
  useEffect( () => {

    const fetchUsuarioEmpresas = async idUser => {
      try {
        const response = await axios.get( `${apiUrl}/usuario-empresas/${idUser}`, {
          headers: {
            'Authorization': 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid',
            'Accept': 'application/json',
          }
        } )
        setUsuarioEmpresas( response.data )
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsuarioEmpresas( 5 )

  }, [] )

  /**
   * Get Data from all user's Empresas.
   */
  useEffect( () => {

    usuarioEmpresas.map( usuarioEmpresa => {

      fetchUsuarioEmpresasData( usuarioEmpresa.id ).then( data => {
      
        setUsuarioEmpresasData( usuarioEmpresasData => [...usuarioEmpresasData, data] )

      } )

    } )

    setIsLoading( false )

  }, [usuarioEmpresas] )


    
    return (
      <View style={styles.container}>
  
        <TopBar />
  
        <MainView>

          <ProgressBlock title='venta total' helpText={`Texto de ayuda de venta total`} icon='money-bill' width='100%'>
            {
              usuarioEmpresas.map( (empresa) => {
                return (
                  <GaugeBar
                    title={empresa.nomcom_emp}
                    key={empresa.id}
                    idEmpresa={empresa.id}
                    currentValue={15000}
                    limitValue={44814}
                    height={48}
                  />
                )
              } )
            }
          </ProgressBlock>

          <ProgressBlock title='Mesas' icon='concierge-bell'/>
          <ProgressBlock title='clientes (pax)' helpText={`Texto de ayuda de clientes`} icon='chair'/>
          <ProgressBlock title='ticket promedio' helpText={`Texto de ayuda de ticket promedio`} icon='ticket-alt'/>
          <ProgressBlock title='consumo por persona' helpText={`Texto de ayuda de consumo por persona`} icon='clipboard-list'/>
          
        </MainView>
  
        <BottomBar />
  
        <StatusBar style="auto" />
  
      </View>
    );

  }


  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '320px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
});
