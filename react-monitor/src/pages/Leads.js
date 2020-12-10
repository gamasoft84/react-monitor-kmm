import React from 'react'
import { Divider, Typography} from 'antd';
import { BandChart } from './BandChart';


const { Title } = Typography;


export const Leads = () => {
    return (
        <div>
           <Title level={ 2 }>Leads</Title>
            <Divider />
            <BandChart title = {"Leads"} />
        </div>
    )
}
