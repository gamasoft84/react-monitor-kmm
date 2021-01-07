import React from 'react'
import { Divider, Typography} from 'antd';
import BarChartHook from '../components/charts/BarChartHook';
import TreeMapHook from '../components/charts/TreeMapHook';


const { Title } = Typography;


export const Leads = () => {
    return (
        <div>
           <Title level={ 2 }>Leads</Title>
            <Divider />
            <BarChartHook  title = {"Leads"}/>
            <Divider />
            <TreeMapHook  title = {"Leads"}/>
        </div>
    )
}
