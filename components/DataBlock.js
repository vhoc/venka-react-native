import { StyleSheet, View, Text } from "react-native"

const DataBlock = ( { width = '100%', height = 'auto' } ) => {

    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            padding: '1rem',
            border: '1px solid #eeeeee',
            borderRadius: '0.6rem',
        }
    })

    return (
        
        <View style={ styles.container }>
            <Text>DataBlock</Text>
        </View>

    )

}

export default DataBlock