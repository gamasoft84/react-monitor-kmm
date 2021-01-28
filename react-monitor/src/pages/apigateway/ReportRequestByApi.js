import React, { useEffect, useState } from 'react';
import { findRequestByIdApi } from '../../helpers/getDataKMM';
import { Col, Row, Typography, Divider, Table, Space, Button, Tag} from 'antd';
import { fetchAGSinToken } from '../../helpers/fetchApiGateway';


const { Title  } = Typography;
  

export const ReportRequestByApi = ({idApi, nameApi}) => {

    const [ elements, setElements ] = useState([]);
    const [ filteredInfo, setFilteredInfo ] = useState([]);
    const [ sortedInfo, setSortedInfo ] = useState([]);
    const [ responseData  , setResponseData] = useState([])


const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo([]);
  };

 const clearAll = () => {
    setSortedInfo([]);
    setFilteredInfo([]);
  };

 
const columns = [
    {
      title: 'Message ID',
      dataIndex: 'MSG_ID',
      key: 'MSG_ID',
      sorter: (a, b) => a.MSG_ID.toLowerCase() < b.MSG_ID.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'MSG_ID' && sortedInfo.order,
    },
    {
      title: 'Request Send Data',
      dataIndex: 'RQ_SEND_DDHHMI',
      key: 'RQ_SEND_DDHHMI',
      sorter: (a, b) => a.RQ_SEND_DDHHMI.toLowerCase() < b.RQ_SEND_DDHHMI.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'RQ_SEND_DDHHMI' && sortedInfo.order
    },
    {
      title: 'Result Code',
      dataIndex: 'TRSC_RSLT_CD',
      key: 'TRSC_RSLT_CD',
      sorter: (a, b) => a.TRSC_RSLT_CD.toLowerCase() < b.TRSC_RSLT_CD.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'TRSC_RSLT_CD' && sortedInfo.order,
      render: (text, record) => (
        <>

            <Tag color={text !== 'GCORESU' ? 'volcano' : 'green'} key={text}>
              {text}
            </Tag>
        </>          
      ) 
    },
    {
      title: 'Request',
      dataIndex: 'RQ_XML',
      key: 'RQ_XML',
      sorter: (a, b) => a.RQ_XML.toLowerCase() < b.RQ_XML.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'RQ_XML' && sortedInfo.order,
      render: (text, record) => (
        <>
            <Tag key={text}>
            {text}
            </Tag>
        </>          
      ) 
    },
    {
      title: 'Response',
      dataIndex: 'RSP_XML',
      key: 'RSP_XML',
      sorter: (a, b) => a.RSP_XML.toLowerCase() < b.RSP_XML.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'RSP_XML' && sortedInfo.order,
      render: (text, record) => (
            <Tag color={record.TRSC_RSLT_CD !== 'GCORESU' ? 'volcano' : 'green'} key={text}>
              {record.TRSC_RSLT_CD !== 'GCORESU' ? text : ''}
            </Tag>
      ) 
    }
  ];
 

    useEffect(() => {       
            const top = 3;
            findRequestByIdApi(idApi, top).then((data) => {                  
                setSortedInfo(sortedInfo || {});
                setFilteredInfo(filteredInfo || {});
                if(data){
                    setElements(data.reverse());
                }                
            });
            setResponseData([]);
    }, [filteredInfo,sortedInfo,idApi])    
    
    const startSendData = async () =>{
      const res = await sendData();
      setResponseData(res);
    }

    const sendData = async () => {    
      const responses = []  
      await Promise.all(
        elements.map(async(element) => {
          const resp = await fetchAGSinToken(nameApi,JSON.parse(element.RQ_XML),'POST');
          const data = await resp.json();
          responses.push(data);
        })
      );           
      return responses;
    };



    return (        
    <>

        {
            elements &&(
                <>
                <br></br>
                <Title level={ 2 }>{nameApi}</Title>
                <br></br>
                <Divider />

                {                    
                  <ul>
                    {responseData.map(d =>
                    
                    <li key={d.messageId}>{d.messageId}
                      <ul>
                          <li>
                            <Tag color={d.resultCode != 'GCORESU' ? 'volcano' : 'green'}>
                              {d.resultCode}
                            </Tag>
                          </li>
                          <li>{d.errorManagement?.errorCode}</li>
                          <li>{d.errorManagement?.errorDescription}</li>
                      </ul>
                      <hr></hr>
                    </li>
                    
                    )}
                  </ul> 
                } 
                 <Row>
                    <Col  align="center">
                            <Space style={{ marginBottom: 16 }}>
                                <Button onClick={startSendData}>Send Data</Button>
                                <Button onClick={clearFilters}>Clear filters</Button>
                                <Button onClick={clearAll}>Clear filters and sorters</Button>
                            </Space>
                            <Table rowKey={elements => elements.MSG_ID} columns={columns} dataSource={elements} onChange={handleChange} />  
                    </Col>
                </Row>

               
                </>
            )
        }
    </>
    )
}
