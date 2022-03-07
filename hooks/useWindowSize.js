import { useState, useLayoutEffect } from "react";
import { Dimensions } from 'react-native'

window.addEventListener = x => x
window.removeEventListener = x => x

const useWindowSize = () => {
    const [size, setSize] = useState( [0,0] )

    useLayoutEffect( () => {
        const updateSize = () => {
            setSize( [Dimensions.get('window').width, Dimensions.get('window').height] )
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [] )

    return size
}

export default useWindowSize