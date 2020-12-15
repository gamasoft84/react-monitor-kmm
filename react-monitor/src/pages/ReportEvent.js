import React, { useEffect, useState } from 'react';
import { getDataEventKMM } from '../helpers/getDataKMM';
import { Col, Row, Typography, Card, Tag, Divider, Table, Spin, Space} from 'antd';
import { ExportCSV } from '../helpers/ExportCSV';
import {toogleById} from '../util/util'

const { Title, Text } = Typography;

const columns = [
    {
      title: 'Dealer',
      dataIndex: 'dealer',
      key: 'dealer',
      sorter: (a, b) => a.dealer.toLowerCase() < b.dealer.toLowerCase()
    },
    {
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
      sorter: (a, b) => a.total - b.total,
      
    }
  ];

export const ReportEvent = ({idEvent, nameEvent}) => {
    const [ agencias, setAgencias ] = useState([]);
    const [ totalRegister, setTotalRegister ] = useState([]);
    const [ totalFirst, seTotalFirst ] = useState();
    const [ dealerFirst, setDealerFirst ] = useState();

    useEffect(() => {
        setAgencias([]);
        seTotalFirst();
        setDealerFirst();
        toogleById("idSpinner");
        toogleById("idExportCsv");           
        if(idEvent){
            getDataEventKMM(idEvent).then((data) => {
                setAgencias(data);
                if(data){
                    seTotalFirst(data[0].total);
                    setDealerFirst(data[0].dealer);
                    setTotalRegister(data.map( d => d.total).reduce( (a, b) => a + b, 0));
                    toogleById("idSpinner");
                    toogleById("idExportCsv");
                }
            });
        }     

    }, [idEvent])    

    return (
        
    <>
        {
            agencias && idEvent &&(
                <>
                <Row style={{ marginTop: 20 }}>
                    <Col span={ 24 } offset={ 0 } align="center">
                        <Text type="success" style={{ fontSize: 36 }}>
                        "{nameEvent}" ( {totalRegister} Registers) 
                        </Text>
                        <br/>
                        <div id="idExportCsv">
                            <ExportCSV csvData={agencias} fileName={"R"} total={totalRegister} idEvent={idEvent}/>
                        </div>
                        <Space size="middle" align="center" id="idSpinner" style={{ display: "none" }}>
                            <Spin size="large" tip="Loading..." />
                        </Space>
                        <Divider> Detail </Divider>                        
                    </Col>
                </Row>
                <Row>
                    <Col span={ 12 } align="center">
                        <Card
                            style={{ width: 300, marginTop: 0 }}
                            actions={[
                                <Tag color="green"> Total: {totalFirst} </Tag>,
                            ]}
                        >
                            <Title> {dealerFirst} </Title>
                        </Card>
                    </Col>
                    <Col span={ 12 } offset={ 0 } align="center">
                            <Table rowKey={agencias => agencias.dealer} columns={columns} dataSource={agencias} />  
                    </Col>
                </Row>
                </>
            )
        }
    </>



    )
}
