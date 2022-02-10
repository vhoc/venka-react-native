import { StyleSheet, View, Text } from "react-native"
import BlockHeader from "./BlockHeader"
import { Shadow } from "react-native-shadow-2"
import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

const ProgressBlock = ( { children, title = '', helpText, icon, width = '100%', height = 'auto' } ) => {

    const [viewWidth, setViewWidth] = useState(window.innerWidth)
    const [blockWidth, setBlockWidth ] = useState(window.innerWidth)
    

    let styles = StyleSheet.create({
        container: {
            width: width,
            minWidth: blockWidth,
            //maxWidth: '450px',
            height: height,
            padding: '0.7rem',
            paddingTop: '0.3rem',
            border: '1px solid #eeeeee',
            borderRadius: '0.6rem',
        },
    })

    useEffect( () => {

        const handleResize = () => {
            setViewWidth( window.innerWidth )
        }

        window.addEventListener( 'resize', handleResize )

    } )

    useEffect( () => {

        if ( viewWidth >= 0 && viewWidth <=479 ) setBlockWidth( 320 )

        if ( viewWidth >= 480 && viewWidth <= 767 ) setBlockWidth( 480 )

        if ( viewWidth >= 768 ) setBlockWidth( 480 )

    }, [viewWidth] )

    return (
        <Shadow distance={5} startColor={'#00000010'} radius={8} viewStyle={ styles.container }>
            <View>

                <BlockHeader icon={ icon } title={ title } helpText={ helpText }/>

                {children}
                
            </View>
        </Shadow>

    )

}

export default ProgressBlock