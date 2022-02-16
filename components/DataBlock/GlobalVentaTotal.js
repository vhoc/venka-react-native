import { StyleSheet, View, Text } from 'react-native'
import BlockHeader from './BlockHeader'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState, useRef } from 'react'
import GaugeBar from './GaugeBar'
import axios from 'axios'
import * as Progress from 'react-native-progress'

const GlobalVentaTotal = ({
  idUsuario,
  selectedDate,
  selectedDateLimit = selectedDate,
  title = '',
  helpText,
  icon,
  width = '100%',
  height = 'auto',
}) => {
  const firstRender = useRef(true)

  const [isLoading, setIsLoading] = useState(true)
  const [viewWidth, setViewWidth] = useState(window.innerWidth)
  const [blockWidth, setBlockWidth] = useState(window.innerWidth)
  //const [usuarioEmpresas, setUsuarioEmpresas] = useState([])

  const [dataSet, setDataSet] = useState([])
  const [metaSet, setMetaSet] = useState([])

  const [allData, setAllData] = useState()

  const apiUrl = 'https://venka.app/api'
  const token = 'Bearer 5|rWPvximC35rCs3UYTvadmJkI9Mz7S1spRgqyDFid'

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
    loadingText: {
      color: '#73b73e',
    },
  })

  /**
   * Responsiveness
   */
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    if (viewWidth >= 0 && viewWidth <= 479) setBlockWidth(320)

    if (viewWidth >= 480 && viewWidth <= 767) setBlockWidth(480)

    if (viewWidth >= 768) setBlockWidth(480)
  }, [idUsuario, window.innerWidth])

  useEffect(() => {
    /**
     * Get all of the user's Empresas.
     */
    const fetchUsuarioEmpresas = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/usuario-empresas/${idUsuario}`,
          {
            headers: {
              Authorization: token,
              Accept: 'application/json',
            },
          },
        )
        //setUsuarioEmpresas(await response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * Fill dataSet
     */
    const fetchData = async (idEmpresa, columnName) => {
      try {
        const response = await axios.get(
          `${apiUrl}/datalive/${idEmpresa}/${columnName}`,
          {
            headers: {
              Authorization: token,
            },
          },
        )
        const preValue = await response.data

        // Fix to prevent problems when receiving a comma ',' for decimal separator instead of a dot '.'
        const parsed = parseFloat(preValue.replace(',', '.').replace(' ', ''))

        const value = Number(parsed)
        return value
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * Fill metaSet
     */
    const fetchMeta = async (idEmpresa, date, limitDate = null) => {
      try {
        if (limitDate === null || !(limitDate === date)) {
          const response = await axios.post(
            `${apiUrl}/meta/rango/`,
            {
              id_empresa: idEmpresa,
              fecha_inicial: date,
              fecha_final: limitDate,
            },
            {
              headers: {
                Authorization: token,
              },
            },
          )

          const value = await response.data
          return value
        } else {
          const year = date.getFullYear()
          const month = date.getMonth()
          const day = date.getDay()

          const response = await axios.get(
            `${apiUrl}/meta/${idEmpresa}/${year}/${month}/${day}`,
            {
              headers: {
                Authorization: token,
              },
            },
          )

          const value = await response.data[0]
          return value
        }
      } catch (error) {
        console.log(error)
      }
    }

    let combinedData = []

    // Get user's empresas
    fetchUsuarioEmpresas()
      .then((uEmpresas) => {
        // Iterate over those empresas
        uEmpresas.map((uEmpresa) => {

          // Internal variables to hold the data temporarily
          let ventaData = {}
          let metaData = {}

          // Get 'ventas' from each of those empresas
          fetchData(uEmpresa.id, 'vta_tuno_open')
            .then((data) => {
              // update this internal variable "ventaData" with that data
              ventaData = {
                idEmpresa: uEmpresa.id,
                nombreEmpresa: uEmpresa.nomcom_emp,
                ventaTotal: data,
              }
              // update the state dataSet
              setDataSet((dataSet) => [
                ...dataSet,
                {
                  idEmpresa: uEmpresa.id,
                  nombreEmpresa: uEmpresa.nomcom_emp,
                  ventaTotal: data,
                },
              ])
            })
            .then(() => {
              // Get 'metas' from each empresa
              fetchMeta(uEmpresa.id, selectedDate, selectedDateLimit)
                .then((meta) => {
                  // update internal variable "metaData" with the metas
                  metaData = {
                    idEmpresa: uEmpresa.id,
                    fecha: meta.fecha,
                    meta: Number(meta.meta),
                  }
                  // update the state metaSet
                  setMetaSet((metaSet) => [
                    ...metaSet,
                    {
                      idEmpresa: uEmpresa.id,
                      fecha: meta.fecha,
                      meta: Number(meta.meta),
                    },
                  ])
                })
                .then(() => {
                  // Combine ventas and metas into a new array "merged"
                  const mergeData = (arr1, arr2) => {
                    if (arr1.idEmpresa === arr2.idEmpresa) {
                      return Object.assign({}, arr1, arr2)
                    }
                  }
                  const merged = mergeData(ventaData, metaData)

                  combinedData.push(merged)
                })
            })
        })
      })
      .then(() => {
        // Assign the merged ventas/metas array to the state "allData"
        setAllData(combinedData)
      })
      .then(() => {
        // Allow rendering
        setIsLoading(false)
      })
  }, [isLoading])

  return (
    <Shadow
      distance={5}
      startColor={'#00000010'}
      radius={8}
      viewStyle={styles.container}
    >
      <View>
        <BlockHeader icon={icon} title={title} helpText={helpText} />

        {isLoading === true ? (
          <>
            <Text style={styles.loadingText}>Cargando...</Text>
            <Progress.Bar
              animated
              indeterminate
              color="#73b73e"
              borderColor="#73b73e"
              width={null}
              height={10}
            />
          </>
        ) : (
          allData.map((data, index) => {
            //if ( allData.length >= 5 ) {
            //console.log( allData )
            return (
              <View key={index}>
                <GaugeBar
                  idEmpresa={data.idEmpresa}
                  currentValue={data.ventaTotal}
                  limitValue={data.meta}
                  height={48}
                />
              </View>
            )
            //}
          })
        )}
      </View>
    </Shadow>
  )
}

export default GlobalVentaTotal
