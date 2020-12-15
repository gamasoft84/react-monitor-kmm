import React, { useEffect, useState } from 'react';
import { getInfoPriceKMM } from '../helpers/getDataKMM';
import { withCommas } from '../util/util';
import { Col, Row, Typography, Divider, Table, Space, Button} from 'antd';

const { Title, Text } = Typography;
  

export const ReportPrice = () => {

    const [ prices, setPrices ] = useState([]);
    const [ filteredInfo, setFilteredInfo ] = useState([]);
    const [ sortedInfo, setSortedInfo ] = useState([]);
    const [ status, setStatus ] = useState();



const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo();
  };

 const clearAll = () => {
    setSortedInfo();
    setFilteredInfo();
  };



  
const columns = [
    {
      title: 'ID',
      dataIndex: 'vehicleID',
      key: 'vehicleID',
      sorter: (a, b) => a.vehicleID.toLowerCase() < b.vehicleID.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'vehicleID' && sortedInfo.order,
    },
    {
      title: 'Code',
      dataIndex: 'localSalesCode',
      key: 'localSalesCode',
      sorter: (a, b) => a.localSalesCode.toLowerCase() < b.localSalesCode.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'localSalesCode' && sortedInfo.order,
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
        sorter: (a, b) => a.model.toLowerCase() < b.model.toLowerCase(),
        sortOrder: sortedInfo.columnKey === 'model' && sortedInfo.order,
        filters: [
            { text: 'STINGER', value: 'STINGER' },
            { text: 'FORTE HATCHBACK	', value: 'FORTE HATCHBACK' },
            { text: 'FORTE SEDAN	', value: 'FORTE SEDAN' },
            { text: 'NIRO	', value: 'NIRO' },
          ],
          filteredValue: filteredInfo.model || null,
          onFilter: (value, record) => value.includes(record.model),
          ellipsis: true,
    },
    {
        title: 'Version',
        dataIndex: 'versionCode',
        key: 'versionCode',
        sorter: (a, b) => a.versionCode.toLowerCase() < b.versionCode.toLowerCase(),
        sortOrder: sortedInfo.columnKey === 'versionCode' && sortedInfo.order,
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
      render: (text, record) => (
        <Text size="middle">
          $ {withCommas(record.price)}
        </Text>
      )      
    },
    {
        title: 'Price Front',
        key: 'precioListaFrN',
        dataIndex: 'precioListaFrN',
        sorter: (a, b) => a.precioListaFrN - b.precioListaFrN,
        sortOrder: sortedInfo.columnKey === 'precioListaFrN' && sortedInfo.order,
        render: (text, record) => (
            
            <Text size="middle">
            $ {withCommas(record.precioListaFrN)}
            </Text>
          ),        
    },
    {
      title: 'Year',
      key: 'modelYear',
      dataIndex: 'modelYear',
      sorter: (a, b) => a.modelYear - b.modelYear,
      sortOrder: sortedInfo.columnKey === 'modelYear' && sortedInfo.order,
      filters: [
        { text: '2021', value: '2021' },
        { text: '2020', value: '2020' },
        { text: '2019', value: '2019' },
      ],
      filteredValue: filteredInfo.modelYear || null,
      onFilter: (value, record) => value.includes(record.modelYear),  
      ellipsis: true,    
    },
    {
        title: 'Insurance Std',
        key: 'gapInsurancePriceStd',
        dataIndex: 'gapInsurancePriceStd',
        sorter: (a, b) => a.gapInsurancePriceStd - b.gapInsurancePriceStd,
        sortOrder: sortedInfo.columnKey === 'gapInsurancePriceStd' && sortedInfo.order,
        render: (text, record) => (
          <Text size="middle">
            $ {withCommas(record.gapInsurancePriceStd)}
          </Text>
        )      
      },
      {
        title: 'Insurance Plus',
        key: 'gapInsurancePricePlus',
        dataIndex: 'gapInsurancePricePlus',
        sorter: (a, b) => a.gapInsurancePricePlus - b.gapInsurancePricePlus,
        sortOrder: sortedInfo.columnKey === 'gapInsurancePricePlus' && sortedInfo.order,
        render: (text, record) => (
          <Text size="middle">
            $ {withCommas(record.gapInsurancePricePlus)}
          </Text>
        )      
      },
  ];
 

    useEffect(() => {       
            getInfoPriceKMM().then((data) => {                  
                setSortedInfo(sortedInfo || {});
                setFilteredInfo(filteredInfo || {});
                data = data[0];
                let dataContent = null; 
                if(data){
                    dataContent = JSON.parse(data.RQ_XML);
                    setPrices(dataContent.contents.reverse());
                    setStatus(data.TRSC_RSLT_CD === "GCORESU" ? "Success": "Fail");
                }
                
            });
    }, [filteredInfo,sortedInfo])    
    

    return (        
    <>
        {
            prices &&(
                <>
                <Title level={ 2 }>Prices</Title>
                <Divider />
                 <Row>
                    <Col  align="center">
                            <Space style={{ marginBottom: 16 }}>
                            {prices && prices.length> 0 && (
                                <Button type={status === 'Success' ? 'primary disabled' : 'danger'}>{status}</Button>                                
                            )}
                                <Button onClick={clearFilters}>Clear filters</Button>
                                <Button onClick={clearAll}>Clear filters and sorters</Button>
                            </Space>
                            <Table rowKey={prices => prices.localSalesCode} columns={columns} dataSource={prices} onChange={handleChange} />  
                    </Col>
                </Row>
                </>
            )
        }
    </>



    )
}
