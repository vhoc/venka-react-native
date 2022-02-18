import GaugeBar from "./GaugeBar"
import { View, Text } from 'react-native'

const BarsContainer = ( {allData} ) => {

    if ( !allData ) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        )
    }

    return (
        <View>
             {
                 allData.length > 0 ? 
                    (allData.map( (data, index) => {
                        return (<GaugeBar
                            key={index}
                            idEmpresa={data.idEmpresa}
                            currentValue={data.ventaTotal}
                            limitValue={data.meta}
                            height={48}
                        />)
                    })) : (
                        <Text>No se obtuvieron datos</Text>
                    )
            }
            
        </View>
    )

}

export default BarsContainer