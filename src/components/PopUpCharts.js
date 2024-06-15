import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import "../pages/charts/index.css"

export default function PopUpCharts({hidden, clickBackGround}) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [dataBarChart1, setDataBarChart1] = React.useState({})

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://iai-be-deploy.vercel.app/api/hello');
        const jsonData = await response.json();
        const formattedData = jsonData.features.map( feature => ({
          location : feature.properties.location,
          air_quality_index: feature.properties.air_quality_index,
          pm10: feature.properties.pm10,
          pm2_5: feature.properties.pm2_5,
          o3: feature.properties.o3,
          no2: feature.properties.no2,
          so2: feature.properties.so2,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch data every 30 seconds
  
    return () => clearInterval(interval); // Cleanup
  
  }, []);



  const handleRowClick = (index, location) => {
    setSelectedRow(index);
    const selectedLocation = data.find(item => item.location == location)
    setDataBarChart1({
      dataNumerik :[selectedLocation.air_quality_index, selectedLocation.pm10, selectedLocation.pm2_5, selectedLocation.o3, selectedLocation.no2, selectedLocation.so2],
      lokasi : location})

  };  

  if (hidden) return null;
  return(
        <>
            <div 
              onClick={clickBackGround}
              style={{zIndex: 51}}
              className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40 flex items-center justify-center">
                <div className="flex h-[90%] w-[85%] rounded-lg bg-white">
                  <div className='flex flex-1 p-3'>
                    <TableContainer component={Paper} >
                      <Table aria-label="simple table" stickyHeader >
                        <TableHead>
                          <TableRow>
                            <TableCell>Lokasi</TableCell>
                            <TableCell align="right">Air&nbsp;Quality</TableCell>
                            <TableCell align="right">PM10</TableCell>
                            <TableCell align="right">PM2_5</TableCell>
                            <TableCell align="right">O<sup>3</sup></TableCell>
                            <TableCell align="right">NO<sup>2</sup></TableCell>
                            <TableCell align="right">SO<sup>2</sup></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.map((row,index) => (
                            <TableRow
                              key={row.name}
                              onClick={() => handleRowClick(index, row.location) }
                              sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: selectedRow === index ? '#02B2AF' : 'white',
                                    cursor: 'pointer' }}
                              
                            >
                              <TableCell component="th" scope="row">
                                {row.location}
                              </TableCell>
                              <TableCell align="right">{row.air_quality_index}</TableCell>
                              <TableCell align="right">{row.pm10}</TableCell>
                              <TableCell align="right">{row.pm2_5}</TableCell>
                              <TableCell align="right">{row.o3}</TableCell>
                              <TableCell align="right">{row.no2}</TableCell>
                              <TableCell align="right">{row.so2}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className='flex flex-col flex-1'>
                    <div className='flex flex-1 p-0'>
                      <BarChart
                        sx={{
                          maxHeight : "95%",
                          maxWidth : '95%'  
                        }}
                        xAxis={[{ scaleType: 'band', label : dataBarChart1?.lokasi ?? "", data: ['Air Quality', 'PM10', 'PM2_5', 'O3', 'NO2', 'SO2'] }]}
                        series={[{ data: dataBarChart1?.dataNumerik ?? [] }]}
                      />
                    </div>
                    <div className='flex flex-col items-center flex-1 relative p-1'>
                      <h2 className='absolute top-4 font-semibold text-xl'>Air&nbsp;Quality&nbsp;Index</h2>
                      <BarChart
                        dataset={data}
                        sx={{
                          maxHeight : "95%",
                          maxWidth : '95%'  
                        }}
                        xAxis={[{ scaleType: 'band', dataKey: `location`  }]}
                        series={[{dataKey:"air_quality_index"}]}
                      />
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}