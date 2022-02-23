export const venkaFormat = ( date ) => {
    return date.toLocaleDateString( 'es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' } ).split('/').reverse().join('/')
}

/**
 * Current periods
 */

export const today = () => {
    const date = new Date()
    return venkaFormat( date )
}

export const currentWeekMonday = () => {    
    const date = new Date()
    let day = date.getDay() || 7
    if ( day !== 1 ) {
        date.setHours( -24 * (day - 1) )
    }
    return venkaFormat( date )
}

export const firstDayOfCurrentMonth = () => {
    const date = new Date()
    const firstDay = new Date( date.getFullYear(), date.getMonth(), 1 )
    return venkaFormat( firstDay )
}

export const firstDayOfCurrentYear = () => {
    const date = new Date()
    const firstDay = new Date( date.getFullYear(), 0, 1 )
    return venkaFormat( firstDay )
}

/**
 * Last periods
 */

export const yesterday = () => {
    const computedDate = new Date( new Date().setDate(new Date().getDate()-1) )
    return venkaFormat( computedDate )
}

export const thisDayLastWeek = () => {
    const today = new Date()
    const lastweek = new Date( today.getFullYear(), today.getMonth(), today.getDate()-7 )
    return venkaFormat( lastweek )
}

export const lastWeekMonday = () => {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if(date.getDay() == 0){
        prevMonday.setDate(date.getDate() - 14);
    } else {
        prevMonday.setDate(date.getDate() - (day+6));
    }
    return venkaFormat(prevMonday);
}

export const thisDayLastMonth = () => {
    const date = new Date()
    date.setMonth( date.getMonth() - 1 )
    return venkaFormat( date )
}

export const firstDayOfLastMonth = () => {
    const date = new Date()
    date.setDate(1)
    date.setMonth( date.getMonth() - 1 )
    return venkaFormat( date )
}

export const firstDayOfLastYear = () => {
    const date = new Date()
    date.setDate(1)
    date.setMonth( 0 )
    date.setFullYear( date.getFullYear() - 1 )
    return venkaFormat( date )
}

export const thisDayOfLastYear = () => {
    const date = new Date()
    date.setFullYear( date.getFullYear() - 1 )
    return venkaFormat( date )
}