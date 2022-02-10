import { StyleSheet, View, Text } from "react-native"
import DataBlockHeader from "./DataBlockHeader"
import ProgressBar from "./ProgressBar"

const DataBlock = ( { title = '', helpText, icon, width = '100%', height = 'auto' } ) => {

    const styles = StyleSheet.create({
        container: {
            width: width,
            minWidth: '300px',
            maxWidth: '450px',
            height: height,
            padding: '0.7rem',
            paddingTop: '0.3rem',
            border: '1px solid #eeeeee',
            borderRadius: '0.6rem',
        }
    })

    return (
        
        <View style={ styles.container }>
            <DataBlockHeader icon={ icon } title={ title } helpText={ helpText }/>
            <ProgressBar title={'nombre del restaurante'} sale={50} goal={150}/>
        </View>

    )

}

export default DataBlock