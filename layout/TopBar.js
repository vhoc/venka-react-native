import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import VenkaImagotipo from '../assets/Icons/venka-imagotipo.svg'

const TopBar = () => {

    const handleRefreshButton = () => {
        alert( 'refresh' )
    }

    const handleMenuButton = () => {
        alert( 'show menu ')
    }

    return (
        <View style={ styles.container } >
            <TouchableOpacity style={ styles.clickable } onPress={ handleRefreshButton }>
                <FontAwesome5 name={'sync-alt'} solid color={"#fff"} size={30}/>
            </TouchableOpacity>
            
            <View >
                <Image style={ styles.venkaLogo } source={ require('../assets/Icons/venka-imagotipo.svg') } />
            </View>
            
            <TouchableOpacity style={ styles.clickable } onPress={ handleMenuButton }>
                <FontAwesome5 name={ 'ellipsis-v' } solid color={"#fff"} size={30}/>
            </TouchableOpacity>
        </View>
    )

}

export default TopBar

const styles = StyleSheet.create({
    container: {
        minWidth: 320,
        width: '100%',
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#73b73e',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        position: 'absolute',
        zIndex: 9999,
    },
    logoContainer: {
        width: '100%',
    },
    venkaLogo: {
        width: 70,
        height: 62,
    },
    clickable: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 30,
    }
})