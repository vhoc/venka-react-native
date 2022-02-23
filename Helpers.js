export const venkaFormat = ( date ) => {

    return date.toLocaleDateString( 'es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' } ).split('/').reverse().join('/')

}