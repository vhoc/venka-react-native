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
import { venkaFormat } from './Helpers';

//export const DateContext = React.createContext()

export default function App() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ usuario, setUsuario ] = useState()

  const [ selectedDate, setSelectedDate ] = useState( venkaFormat( new Date() ) )
  const [ selectedDateLimit, setSelectedDateLimit ] = useState( venkaFormat( new Date() ) )

  // Periodo Botón: ANTERIOR
  const dateSetAnterior = () => {
    setSelectedDate( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return venkaFormat( newDate )
    })
    setSelectedDateLimit( () => {
      const newDate = new Date()
      newDate.setDate( newDate.getDate() - 1 )
      return venkaFormat( newDate )
    } )
  }

  // Periodo Botón: ACTUAL
  const dateSetActual = () => {
    setSelectedDate( () => {
      const newDate = new Date()
      return venkaFormat( newDate )
    })
    setSelectedDateLimit( () => {
      const newDate = new Date()
      return venkaFormat( newDate )
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
          !isLoading, !usuario ? (
            <View style={ styles.loading }>
              <Text>Cargando...</Text>
              <Progress.Bar animated indeterminate color="#73b73e" borderColor="#73b73e" height={10}/>
            </View>
          ) : (
            
            <View style={ styles.main }>
              <Text style={ styles.currentDate }>{ selectedDate }</Text>
              <GlobalVentaTotal idUsuario={usuario.id} selectedDate={ selectedDate } selectedDateLimit={ selectedDateLimit } title='venta total' helpText={`Texto de ayuda de venta total`} icon='money-bill' width='100%'/>            
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
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
});
