import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import GlobalVentaTotal from './components/DataBlock/GlobalVentaTotal';
import BottomBar from './layout/BottomBar';
import MainView from './layout/MainView';
import TopBar from './layout/TopBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress'

export default function App() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ usuario, setUsuario ] = useState()

  const apiUrl = 'https://venka.app/api'

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
        setIsLoading( false )
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchUsuario( 5 )

  }, [] )
    
  return (
    <View style={styles.container}>

      <TopBar />

      <MainView>

        {
          isLoading, usuario ? (
            <>
              <GlobalVentaTotal idUsuario={usuario.id} selectedDate={ new Date( '2022-02-16' ) } selectedDateLimit={ new Date( '2022-02-16' ) } title='venta total' helpText={`Texto de ayuda de venta total`} icon='money-bill' width='100%'/>
              
            </>
          ) : (
            <>
              <Text>Cargando...</Text>
              <Progress.Bar animated indeterminate color="#73b73e" borderColor="#73b73e"/>
            </>
            
          )
        }

        
        
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
