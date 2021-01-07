import React, { useEffect, useState } from 'react'
import { Divider, Typography} from 'antd';
import { findTimesFrame } from '../../helpers/getDataKMM';
import BarChartHook from '../../components/charts/BarChartHook';
const { Title } = Typography;

const TimeFramePurcharse = () => {

    const [data, setData] = useState();

    useEffect(() => {
        findTimesFrame().then((data) => {
            setData(data);
            console.log('findTimesFrame: ', data.length);
        }); 
    }, [])

    return (
        <div>           
            <Title level={ 2 }>Time Frame Purcharse</Title>
            <Divider />
            {data && <BarChartHook  title = {"TimeFramePurcharse"} data ={data} categoryY="timeFrame"/>}
        </div>
    )
}

export default TimeFramePurcharse
