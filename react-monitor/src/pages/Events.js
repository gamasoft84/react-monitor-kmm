import React, { useEffect, useState } from 'react';
import { Col, Row, Typography, Divider, Select } from 'antd';
import { ReportEvent } from './ReportEvent';
import { getInfoEventsKMM } from '../helpers/getInfoEventsKMM';
const { Option } = Select;

const { Title } = Typography;


export const Events = ({title}) => {

    const [ eventsKMM, setEventsKMM] = useState([]);
    const [ idEvent, setIdEvent] = useState();
    const [ nameEvent, setNameEvent] = useState('');


    useEffect(() => {
        getInfoEventsKMM().then((data) => {
                setEventsKMM(data)
            });           
    }, [])  

    const eventOnChangeSelect = (idEventParam,nameEventParam) => {
        setIdEvent(idEventParam);
        setNameEvent(nameEventParam);
    }

    return (
        <div>
            <Title level={ 2 }>Events:</Title>
            <Divider />
            <Row>
                <Col span={ 8 }>
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Search to Select Event"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(key, option) =>
                            eventOnChangeSelect(key, option.children)
                        }
                    >
                        {eventsKMM.map( item => <Option key={ item.idEvent } value={ item.idEvent }>{ item.nameEvent }</Option>)}
                    </Select>
                </Col>      
            </Row>

            <ReportEvent title = {"Events"} idEvent={idEvent} nameEvent={nameEvent}/>

        </div>
    )
}
