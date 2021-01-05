import React from 'react'
import { Divider, Typography, Button} from 'antd';
import ItemSummary from './ItemSummary';
const { Title } = Typography;


const SummaryByDay = () => {

    const types = ['Leads','Quotations','DriveTests'];
    return (
        <div>
            <Title level={ 2 }>Summary by Day</Title>
            <Divider /> 
        
            {types.map(item=> (<ItemSummary key={item} item={item}/>))}
            
            <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
            </Button>
        </div>
    )
}

export default SummaryByDay
