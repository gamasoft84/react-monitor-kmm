import React, { useEffect, useState } from 'react'
import { Divider, Typography} from 'antd';
import { findLeadTypes } from '../../helpers/getDataKMM';
import BarChartHook from '../../components/charts/BarChartHook';
const { Title } = Typography;

const LeadType = () => {

    const [data, setData] = useState();

    useEffect(() => {
        findLeadTypes().then((data) => {
            setData(data);
            console.log('findLeadTypes: ', data.length);
        }); 
    }, [])

    return (
        <div>           
            <Title level={ 2 }>Lead Types</Title>
            <Divider />
            <BarChartHook  title = {"LeadType"} dataProp ={data} categoryY="leadType"/>
        </div>
    )
}

export default LeadType
