import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native'
import GlobalVentaTotal from './components/DataBlock/GlobalVentaTotal'
import BottomBar from './layout/BottomBar'
//import MainView from './layout/MainView'
import TopBar from './layout/TopBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress'
import { venkaFormat } from './Helpers'

const screenHeight = Dimensions.get( 'window' ).height

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [usuario, setUsuario] = useState()

  const [selectedDate, setSelectedDate] = useState(venkaFormat(new Date()))
  const [selectedDateLimit, setSelectedDateLimit] = useState(
    venkaFormat(new Date()),
  )

  const [toggleSwitch, setToggleSwitch] = useState({
    startDate: venkaFormat(new Date()),
    endDate: venkaFormat(new Date()),
    range: 'day',
    period: 'current',
  })
  const [period, setPeriod] = useState('current')
  const [range, setRange] = useState('day')

  const apiUrl = 'https://venka.app/api'

  /**
   * Get User
   */
  useEffect(() => {
    const fetchUsuario = async (idUser) => {
      try {
        const headers = {
          headers: {
            Authorization: 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid',
            Accept: 'application/json',
          },
        }
        const response = await axios.get(`${apiUrl}/usuario/${idUser}`, headers)
        setUsuario(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsuario(5)
  }, [selectedDate, selectedDateLimit])

  return (
    <SafeAreaView>

    <View style={styles.container}>
      
      
      <ScrollView style={ styles.scrollView } stickyHeaderIndices={ [0] } showsVerticalScrollIndicator={ false } >
        <TopBar />
        {
          (!isLoading,
          !usuario ? (
            <View style={styles.loading}>
              <Text>Cargando...</Text>
              <Progress.Bar
                animated
                indeterminate
                color="#73b73e"
                borderColor="#73b73e"
                height={10}
              />
            </View>
          ) : (
            <View style={styles.main}>
              <Text style={styles.currentDate}>{selectedDate}</Text>
              <GlobalVentaTotal
                idUsuario={usuario.id}
                toggleSwitch={toggleSwitch}
                period={period}
                range={range}
                title="venta total"
                helpText={`Texto de ayuda de venta total`}
                icon="money-bill"
                width="100%"
              />
            </View>
          ))
        }
          
      </ScrollView>
      

      <BottomBar
        setToggleSwitch={setToggleSwitch}
        setPeriod={setPeriod}
        period={period}
        setRange={setRange}
        range={range}
      />    

      <StatusBar style="auto" />
    </View>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: screenHeight,
    minWidth: 320,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginTop: 100,
    marginBottom: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
})
