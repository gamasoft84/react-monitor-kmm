import React, { useEffect, useState } from 'react';
import { Col, Row, Typography, Divider, Select, Button} from 'antd';
import { getDataApis } from '../../helpers/getDataKMM';
import { ReportRequestByApi } from './ReportRequestByApi';
const { Option } = Select;

const { Title } = Typography;


export const SendData = () => {

    const [ apisKMM, setApisKMM] = useState([]);
    const [ idApi, setIdApi] = useState();
    const [ nameApi, setNameApi] = useState('SubmitLeadData');
    const [ idNumberRegiser, setIdNumberRegiser] = useState();
    const [ idApiBkp, setIdApiBkp] = useState(1);
    const [ idNumberRegiserBkp, setIdNumberRegiserBkp] = useState(5);


    useEffect(() => {
            setApisKMM(getDataApis())
    }, [])  

    const apiOnChangeSelect = (idApi,nameApi) => {
        nameApi = nameApi.join(' ');
        nameApi = nameApi.substring(nameApi.indexOf('-') + 3,nameApi.length);
        setIdApiBkp(idApi);
        setNameApi(nameApi);
    }

    const numberRegiterOnChangeSelect = (idNumberRegiser, name) => {
        setIdNumberRegiserBkp(idNumberRegiser);
    }

    const generateOptions = (total) =>{
            const numbers = [];
            for (let index = 1; index <= total; index++) {
                numbers.push(index * 5);               
            }        
            return numbers.map((e, index) => {
            return (
               <Option key={ e } value={ e }>{e}</Option>
            )
         })
    }

    const startFindData = () =>{
        setIdApi(idApiBkp);
        setNameApi(nameApi);
        setIdNumberRegiser(idNumberRegiserBkp);
    }

    return (
        <div>
            <Title level={ 2 }>Send Data Api Gateway</Title>
            <Divider />
            <Row>
                <Col span={ 8 }>
                    <Select defaultValue='1 - SubmitLeadData'
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
                        {apisKMM.map( item => <Option key={ item.id } value={ item.id }>{item.id} - { item.name }</Option>)}
                    </Select>
                </Col>
                <Col span={ 8 }>
                    <Select defaultValue={idNumberRegiserBkp}
                        showSearch
                        style={{ width: 100 }}
                        placeholder="Number of records"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(key, option) =>
                            numberRegiterOnChangeSelect(key, option.children)
                        }
                    >
                        {generateOptions(200)}
                    </Select>
                </Col>      
                <Col span={ 8 }>
                    <Button onClick={startFindData}>Find</Button>
                </Col>      



            </Row>

            <ReportRequestByApi title = {"Request Api"} idApi={idApi} nameApi={nameApi} idNumberRegiser={idNumberRegiser}/>
        </div>
    )
}
