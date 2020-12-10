import React, { useEffect, useState } from 'react';
import { getDataEventKMM } from '../helpers/getDataEventKMM';
import { Col, Row, Typography, Card, Tag, Divider, Table} from 'antd';
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
    const [ totalFirst, seTotalFirst ] = useState([]);
    const [ dealerFirst, setDealerFirst ] = useState([]);


    useEffect(() => {
        setAgencias([]);
        if(idEvent){
            getDataEventKMM(idEvent).then((data) => {
                setAgencias(data);
                if(data){
                    seTotalFirst(data[0].total);
                    setDealerFirst(data[0].dealer);
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
                        "{nameEvent}" ({agencias.map( d => d.total).reduce( (a, b) => a + b, 0)} Registers) 
                        </Text>
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
                            <Table columns={columns} dataSource={agencias} />  
                    </Col>
                </Row>
                </>
            )
        }
    </>



    )
}
