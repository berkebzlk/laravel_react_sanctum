import React, { useState, useEffect } from 'react'
import axios from '../../../../axios'

import DataGrid from '../../../../components/table/DataGrid'
import { Box, Heading } from '@chakra-ui/react'

const StokTanitimKarti = () => {

  const [data, setData] = useState([])

  // fetch data from api
  const fetchStokTanitimKarti = async () => {
    try {
      const response = await axios.get('/stokTanitimKarti')

      setData(response.data)
      console.log('satisFaturaAnaliz response', response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStokTanitimKarti()
  }, [])
 
  if (data.length == 0) {
    console.log('data yokki');
    return "Loading..."
  };

  return (
    <Box p={5}>
    <Heading mb={5}>Stok Tanıtım Kartı</Heading>
    <DataGrid detailPage={true} data={data} unwantedColumns={[]} />
    </Box>
  )
}

export default StokTanitimKarti