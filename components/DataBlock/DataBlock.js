import { StyleSheet, View, Text } from "react-native"
import DataBlockHeader from "./DataBlockHeader"

const DataBlock = ( { width = '100%', height = 'auto' } ) => {

    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            padding: '0.5rem',
            border: '1px solid #eeeeee',
            borderRadius: '0.6rem',
        }
    })

    return (
        
        <View style={ styles.container }>
            <DataBlockHeader icon={'money-bill-alt'} title="Titulo"/>
            <Text>DataBlock</Text>
        </View>

    )

}

export default DataBlock