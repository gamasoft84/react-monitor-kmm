import React, { useEffect, useState } from 'react';
import { Col, Row, Typography, Divider, Select } from 'antd';
import { getDataApis } from '../../helpers/getDataKMM';
import { ReportRequestByApi } from './ReportRequestByApi';
const { Option } = Select;

const { Title } = Typography;


export const SendData = () => {

    const [ apisKMM, setApisKMM] = useState([]);
    const [ idApi, setIdApi] = useState();
    const [ nameApi, setNameApi] = useState('');


    useEffect(() => {
        getDataApis().then((data) => {
                setApisKMM(data)
            });           
    }, [])  

    const apiOnChangeSelect = (idApi,nameApi) => {
        setIdApi(idApi);
        setNameApi(nameApi);
    }

    return (
        <div>
            <Title level={ 2 }>Send Data Api Gateway</Title>
            <Divider />
            <Row>
                <Col span={ 8 }>
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Search to Select Api"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(key, option) =>
                            apiOnChangeSelect(key, option.children)
                        }
                    >
                        {apisKMM.map( item => <Option key={ item.id } value={ item.id }>{ item.name }</Option>)}
                    </Select>
                </Col>      
            </Row>

            <ReportRequestByApi title = {"Request Api"} idApi={idApi} nameApi={nameApi} />
        </div>
    )
}
