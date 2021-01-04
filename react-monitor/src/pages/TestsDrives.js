import React from 'react'
import { Divider, Typography} from 'antd';
import BarChartHook from '../components/charts/BarChartHook';


const { Title } = Typography;


export const TestsDrives = () => {
    return (
        <div>
            <Title level={ 2 }>Test Drives</Title>
            <Divider />
            <BarChartHook  title = {"DriveTests"}/>
        </div>
    )
}
