import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DataBlock from './components/DataBlock';
import BottomBar from './layout/BottomBar';
import MainView from './layout/MainView';
import TopBar from './layout/TopBar';

export default function App() {
  return (
    <View style={styles.container}>

      <TopBar />

      <MainView>
        <DataBlock/>
      </MainView>

      <BottomBar />

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
});
