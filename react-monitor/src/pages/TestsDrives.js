import React from 'react'
import { Divider, Typography} from 'antd';
import { BandChart } from './BandChart';


const { Title } = Typography;


export const TestsDrives = () => {
    return (
        <div>
            <Title level={ 2 }>Test Drives</Title>
            <Divider />
            <BandChart title = {"DriveTests"}/>
        </div>
    )
}
