import React, { useEffect, useState } from 'react'
import { Divider, Typography} from 'antd';
import { getFindVehiclesOfInterest } from '../../helpers/getDataKMM';
import BarChartHook from '../../components/charts/BarChartHook';
const { Title } = Typography;

const VehicleOfInterest = () => {

    const [data, setData] = useState();

    useEffect(() => {
        getFindVehiclesOfInterest().then((data) => {
            setData(data);
            console.log('getFindVehiclesOfInterest: ', data.length);
        }); 
    }, [])

    return (
        <div>           
            <Title level={ 2 }>Vehicles of Interes</Title>
            <Divider />
            <BarChartHook  title = {"VehicleOfInteres"} dataProp ={data} categoryY="vehicle"/>
        </div>
    )
}

export default VehicleOfInterest
