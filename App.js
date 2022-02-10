import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ProgressBlock from './components/DataBlock/ProgressBlock';
import BottomBar from './layout/BottomBar';
import MainView from './layout/MainView';
import TopBar from './layout/TopBar';
import GaugeBar from './components/DataBlock/GaugeBar';

export default function App() {

    return (
      <View style={styles.container}>
  
        <TopBar />
  
        <MainView>

          <ProgressBlock title='venta total' helpText={`Texto de ayuda de venta total`} icon='money-bill' width='100%'>
            <GaugeBar title={'mariscos el rey obregón'} sale={15430} goal={25000} height={48}/>
            <GaugeBar title={'mariscos el rey guaymas'} sale={50} goal={150} height={48}/>
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
