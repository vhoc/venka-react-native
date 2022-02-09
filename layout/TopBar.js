import { StyleSheet, View, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VenkaImagotipo from '../assets/Icons/venka-imagotipo.svg'

const TopBar = () => {

    const handleRefreshButton = () => {

    }

    const handleMenuButton = () => {

    }

    return (
        <View style={ styles.container } >
            <View>
                <FontAwesome5 name={'sync-alt'} solid color={"#fff"} size={30}/>
            </View>
            
            <View >
                <Image style={ styles.venkaLogo } source={ VenkaImagotipo } />
            </View>
            
            <View>
                <FontAwesome5 name={ 'ellipsis-v' } solid color={"#fff"} size={30}/>
            </View>
        </View>
    )

}

export default TopBar

const styles = StyleSheet.create({
    container: {
        width: '100vw',
        height: '90px',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#73b73e',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        position: 'fixed',
    },
    logoContainer: {
        width: '100%',
    },
    venkaLogo: {
        width: 70,
        height: 62,
    }
})