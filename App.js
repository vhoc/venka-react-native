import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomBar from './layout/BottomBar';
import TopBar from './layout/TopBar';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />
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
