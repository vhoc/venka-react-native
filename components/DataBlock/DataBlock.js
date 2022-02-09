import { StyleSheet, View, Text } from "react-native"
import DataBlockHeader from "./DataBlockHeader"

const DataBlock = ( { title = '', helpText, icon, width = '100%', height = 'auto' } ) => {

    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            padding: '0.7rem',
            border: '1px solid #eeeeee',
            borderRadius: '0.6rem',
        }
    })

    return (
        
        <View style={ styles.container }>
            <DataBlockHeader icon={ icon } title={ title } helpText={ helpText }/>
            <Text>DataBlock</Text>
        </View>

    )

}

export default DataBlock