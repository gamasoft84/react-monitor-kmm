import React, { useEffect, useState } from 'react';
import { getInfoPdvsKMM } from '../../helpers/getDataKMM';
import { Col, Row, Typography, Divider, Table, Space, Button} from 'antd';

const { Title, Text } = Typography;
  

export const ReportPdvs = () => {

    const [ elements, setElements ] = useState([]);
    const [ filteredInfo, setFilteredInfo ] = useState([]);
    const [ sortedInfo, setSortedInfo ] = useState([]);
    const [ status, setStatus ] = useState();



const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
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
      title: 'Code',
      dataIndex: 'dealerCode',
      key: 'dealerCode',
      sorter: (a, b) => a.dealerCode.toLowerCase() < b.dealerCode.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'dealerCode' && sortedInfo.order,
    },
    {
      title: 'Dealer',
      dataIndex: 'dealerName',
      key: 'dealerName',
      sorter: (a, b) => a.dealerName.toLowerCase() < b.dealerName.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'dealerName' && sortedInfo.order,
    },
    {
        title: 'Is Front',
        dataIndex: 'usaPrecioFrontera',
        key: 'usaPrecioFrontera',
        sorter: (a, b) => a.usaPrecioFrontera - b.usaPrecioFrontera,
        sortOrder: sortedInfo.columnKey === 'usaPrecioFrontera' && sortedInfo.order,
        filters: [
            { text: 'YES', value: '1' },
            { text: 'NO', value: '0' },
          ],
          filteredValue: filteredInfo.usaPrecioFrontera || null,
          onFilter: (value, record) => value.includes(record.usaPrecioFrontera),
          render: (text, record) => (
            <Text size="middle">
             { text === "1" ? "YES" : "NO"}
            </Text>
          )  
    },
    {
      title: 'Active',
      dataIndex: 'dealerActive',
      key: 'dealerActive',
      sorter: (a, b) => a.dealerActive - b.dealerActive,
      sortOrder: sortedInfo.columnKey === 'dealerActive' && sortedInfo.order,
      filters: [
          { text: 'YES', value: '1' },
          { text: 'NO', value: '0' },
        ],
        filteredValue: filteredInfo.dealerActive || null,
        onFilter: (value, record) => value.includes(record.dealerActive),
        ellipsis: true,
        render: (text, record) => (
          <Text size="middle">
           { text === "1" ? "YES" : "NO"}
          </Text>
        )      
    },
    {
      title: 'State',
      key: 'stateID',
      dataIndex: 'stateID',
      sorter: (a, b) => a.stateID - b.stateID,
      sortOrder: sortedInfo.columnKey === 'stateID' && sortedInfo.order,     
    }
  ];
 

    useEffect(() => {       
             getInfoPdvsKMM().then((data) => {                  
                setSortedInfo(sortedInfo || {});
                setFilteredInfo(filteredInfo || {});
                data = data[0];
                let dataContent = null; 
                if(data){
                    dataContent = JSON.parse(data.RQ_XML);
                    setElements(dataContent.contents.reverse());
                    setStatus(data.TRSC_RSLT_CD === "GCORESU" ? "Success": "Fail");
                }                
            });
    }, [filteredInfo,sortedInfo])    
    

    return (        
    <>
        {
            elements &&(
                <>
                <Title level={ 2 }>PDVS</Title>
                <Divider />
                 <Row>
                    <Col  align="center">
                            <Space style={{ marginBottom: 16 }}>
                            {elements && elements.length> 0 && (
                                <Button type={status === 'Success' ? 'primary disabled' : 'danger'}>{status}</Button>                                
                            )}
                                <Button onClick={clearFilters}>Clear filters</Button>
                                <Button onClick={clearAll}>Clear filters and sorters</Button>
                            </Space>
                            <Table rowKey={elements => elements.dealerCode} columns={columns} dataSource={elements} onChange={handleChange} />  
                    </Col>
                </Row>
                </>
            )
        }
    </>
    )
}
