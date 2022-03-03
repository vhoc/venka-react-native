import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

// Reads data from "Local Storage"
const getData = async ( key, initialValue ) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if ( value !== null ) {
            const jsonValue = JSON.parse( value )
            return jsonValue
        }
        if ( initialValue instanceof Function ) return initialValue()
        return initialValue
    } catch ( error ) {
        console.warn( error )
    }
}

const useLocalStorage = ( key, initialValue ) => {
    const [ value, setValue ] = useState( () => {
        return getData( key, initialValue )
    } )

    useEffect( async () => {
        try {
            //const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem( key, JSON.stringify(value) )
        } catch ( error ) {
            console.warn( error )
        }
    }, [value] )

    return [ value, setValue ]
}

export default useLocalStorage