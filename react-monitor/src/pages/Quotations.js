import React from 'react'
import { Divider, Typography} from 'antd';
import BarChartHook from '../components/charts/BarChartHook';


const { Title } = Typography;


export const Quotations = () => {
    return (
        <div>
           <Title level={ 2 }>Quotations</Title>
            <Divider />
            <BarChartHook  title = {"Quotations"}/>
        </div>
    )
}
