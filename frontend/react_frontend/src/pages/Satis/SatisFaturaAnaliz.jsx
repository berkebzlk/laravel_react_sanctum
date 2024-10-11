import React, { useState, useEffect } from 'react'
import axios from '../../axios'

import DataGrid from '../../components/table/DataGrid'
import { Box, Heading } from '@chakra-ui/react'

const SatisFaturaAnaliz = () => {

  const [data, setData] = useState([])

  // fetch data from api
  useEffect(() => {
    const fetchSatisAnalizFatura = async () => {
      try {
        const response = await axios.get('/satisFaturaAnaliz')

        setData(response.data)
        console.log('satisFaturaAnaliz response', response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSatisAnalizFatura()
  }, [])

  if (data.length == 0) {
    console.log('data yokki');
    return "Loading..."
  };

  return (
    <Box p={5}>
    <Heading mb={5}>Satış Fatura Analiz</Heading>
    <DataGrid data={data} unwantedColumns={[]} />
    </Box>
  )
}

export default SatisFaturaAnaliz