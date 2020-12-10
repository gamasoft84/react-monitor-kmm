import React from 'react'
import { Divider, Typography} from 'antd';
import { BandChart } from './BandChart';


const { Title } = Typography;


export const Quotations = () => {
    return (
        <div>
           <Title level={ 2 }>Quotations</Title>
            <Divider />
            <BandChart title = {"Quotations"}/>

        </div>
    )
}
