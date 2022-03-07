import { View, StyleSheet, Button } from 'react-native'
import useWindowSize from '../hooks/useWindowSize'
import { today,
    currentWeekMonday,
    firstDayOfCurrentMonth,
    firstDayOfCurrentYear,
    yesterday,
    thisDayLastWeek,
    lastWeekMonday,
    firstDayOfLastMonth,
    thisDayLastMonth,
    thisDayOfLastYear,
    firstDayOfLastYear
} from '../Helpers'

const BottomBar = ( { setToggleSwitch, setPeriod, period, setRange, range } ) => {
    const [windowWidth, windowHeight] = useWindowSize()
    const styles = StyleSheet.create({
        container: {
            width: windowWidth,
            minWidth: 320,
            height: 115,
            display: 'flex',
            backgroundColor: '#73b73e',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
        },
        topRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        bottomRow: {
            display: 'flex',
            flexDirection: 'row'
        }
    })
    const handleRangeSwitch = (range = 'day') => {        
        setRange( range )
        if ( period === 'current' ) {
            switch ( range ) {
                case 'day':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: today(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;

                case 'week':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: currentWeekMonday(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;

                case 'month':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfCurrentMonth(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;
                
                case 'year':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfCurrentYear(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;
            }

        } else {

            switch ( range ) {
                case 'day':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: yesterday(),
                            endDate: yesterday(),
                            range: range,
                            period: 'last',
                    }))
                    break;

                case 'week':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: lastWeekMonday(),
                            endDate: thisDayLastWeek(),
                            range: range,
                            period: 'last',
                    }))
                    break;

                case 'month':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfLastMonth(),
                            endDate: thisDayLastMonth(),
                            range: range,
                            period: 'last',
                    }))
                    break;
                
                case 'year':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfLastYear(),
                            endDate: thisDayOfLastYear(),
                            range: range,
                            period: 'last',
                    }))
                    break;
            }

        }

    }
    
    const handlePeriodSwitch = period => {
        setPeriod( period )
        if ( period === 'current' ) {
            switch ( range ) {
                case 'day':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: today(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;

                case 'week':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: currentWeekMonday(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;

                case 'month':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfCurrentMonth(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;
                
                case 'year':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfCurrentYear(),
                            endDate: today(),
                            range: range,
                            period: period,
                    }))
                    break;
            }

        } else {

            switch ( range ) {
                case 'day':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: yesterday(),
                            endDate: yesterday(),
                            range: range,
                            period: 'last',
                    }))
                    break;

                case 'week':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: lastWeekMonday(),
                            endDate: thisDayLastWeek(),
                            range: range,
                            period: 'last',
                    }))
                    break;

                case 'month':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,
                            startDate: firstDayOfLastMonth(),
                            endDate: thisDayLastMonth(),
                            range: range,
                            period: 'last',
                    }))
                    break;
                
                case 'year':
                    setToggleSwitch( toggleSwitch => ({
                        ...toggleSwitch,                            
                            startDate: firstDayOfLastYear(),
                            endDate: thisDayOfLastYear(),
                            range: range,
                            period: 'last',
                    }))
                    break;
            }

        }
    }

    //useEffect( parentState, [toggleSwitch] )

    return (
        <View style={ styles.container }>
            
            <View style={ styles.topRow } >
                <Button onPress={ () => { handleRangeSwitch('day') } } title="Día" />
                <Button onPress={ () => { handleRangeSwitch('week') } } title="Semana" />
                <Button onPress={ () => { handleRangeSwitch('month') } } title="Mes" />
                <Button onPress={ () => { handleRangeSwitch('year') } } title="Año" />
            </View>

            <View style={ styles.bottomRow } >
                <Button onPress={ () => { handlePeriodSwitch('current') } } title="Actual"/>
                <Button onPress={ () => { handlePeriodSwitch('last') } } title="Anterior"/>
            </View>

            
        </View>
    )

}

export default BottomBar

