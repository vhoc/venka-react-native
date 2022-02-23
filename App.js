import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import GlobalVentaTotal from './components/DataBlock/GlobalVentaTotal';
import BottomBar from './layout/BottomBar';
import MainView from './layout/MainView';
import TopBar from './layout/TopBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress'

//export const DateContext = React.createContext()

export default function App() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ usuario, setUsuario ] = useState()

  const [ selectedDate, setSelectedDate ] = useState( new Date().toLocaleDateString( 'es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' } ) )
  const [ selectedDateLimit, setSelectedDateLimit ] = useState( new Date().toLocaleDateString( 'es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' } ) )

  const dateSetAnterior = () => {
    setSelectedDate( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return newDate.toLocaleDateString()
    })
    setSelectedDateLimit( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return newDate.toLocaleDateString()
    } )
  }

  const dateSetActual = () => {
    setSelectedDate( () => {
      const newDate = new Date()
      return newDate.toLocaleDateString()
    })
    setSelectedDateLimit( () => {
      const newDate = new Date()
      return newDate.toLocaleDateString()
    } )
  }

  const apiUrl = 'https://venka.app/api'

  /**
   * Get User
   */
  useEffect( () => {
    const fetchUsuario = async idUser => {
      try {
        const headers = { headers: { 'Authorization': 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid', 'Accept': 'application/json' } }
        const response = await axios.get( `${apiUrl}/usuario/${idUser}`, headers )
        setUsuario( response.data )
        setIsLoading( false )
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchUsuario( 5 )

  }, [selectedDate, selectedDateLimit] )
    
  return (
    <View style={styles.container}>

      <TopBar />

      <MainView>

        {
          isLoading, usuario ? (
            <>
              <GlobalVentaTotal idUsuario={usuario.id} selectedDate={ selectedDate } selectedDateLimit={ selectedDateLimit } title='venta total' helpText={`Texto de ayuda de venta total`} icon='money-bill' width='100%'/>
              
            </>
          ) : (
            <View style={ styles.loading }>
              <Text>Cargando...</Text>
              <Progress.Bar animated indeterminate color="#73b73e" borderColor="#73b73e" height={10}/>
            </View>
            
          )
        }

        
        
      </MainView>

      <BottomBar dateSetActual={ dateSetActual } dateSetAnterior={ dateSetAnterior }/>

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
    justifyContent: 'flex-start',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
});
