import React, { useEffect, useState } from 'react';
import { getLeadsCrm } from '../helpers/getDataKMM';
import { ExportLeadDataCSV } from '../helpers/ExportLeadDataCSV';
import { Col, Row, Typography, Divider, Table, Space, Button} from 'antd';

const { Title } = Typography;
  

export const LeadsCrm = () => {

    const [ elements, setElements ] = useState([]);
    const [ totalRegister, setTotalRegister ] = useState([]);
    const [ filteredInfo, setFilteredInfo ] = useState([]);
    const [ sortedInfo, setSortedInfo ] = useState([]);



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
      title: 'Date',
      dataIndex: 'leadCreatedDate',
      key: 'leadCreatedDate',
      sorter: (a, b) => a.leadCreatedDate.toLowerCase() < b.leadCreatedDate.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'leadCreatedDate' && sortedInfo.order,
    },
    {
      title: 'Type',
      dataIndex: 'leadTypeStr',
      key: 'leadTypeStr',
      sorter: (a, b) => a.leadTypeStr.toLowerCase() < b.leadTypeStr.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'leadTypeStr' && sortedInfo.order,
    },
    {
      title: 'ID',
      dataIndex: 'leadID',
      key: 'leadID',
      sorter: (a, b) => a.leadID.toLowerCase() < b.leadID.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'leadID' && sortedInfo.order,
    },
    {
      title: 'Source System',
      dataIndex: 'sourceSystemDetail',
      key: 'sourceSystemDetail',
      sorter: (a, b) => a.sourceSystemDetail.toLowerCase() < b.sourceSystemDetail.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'sourceSystemDetail' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
      sorter: (a, b) => a.middleName.toLowerCase() < b.middleName.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'middleName' && sortedInfo.order,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName2',
      key: 'lastName2',
      sorter: (a, b) => a.lastName2.toLowerCase() < b.lastName2.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'lastName2' && sortedInfo.order,
    },
    {
      title: 'Work Phone',
      dataIndex: 'workPhone',
      key: 'workPhone',
      sorter: (a, b) => a.workPhone.toLowerCase() < b.workPhone.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'workPhone' && sortedInfo.order,
    },
    {
      title: 'Home Phone',
      dataIndex: 'homePhone',
      key: 'homePhone',
      sorter: (a, b) => a.homePhone.toLowerCase() < b.homePhone.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'homePhone' && sortedInfo.order,
    },
    {
      title: 'Mobile Phone',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      sorter: (a, b) => a.mobilePhone.toLowerCase() < b.mobilePhone.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'mobilePhone' && sortedInfo.order,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.toLowerCase() < b.email.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'purchase Intension Time',
      dataIndex: 'purchaseIntensionTimeFrameStr',
      key: 'purchaseIntensionTimeFrameStr',
      sorter: (a, b) => a.purchaseIntensionTimeFrameStr.toLowerCase() < b.purchaseIntensionTimeFrameStr.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'purchaseIntensionTimeFrameStr' && sortedInfo.order,
    },
    {
      title: 'vehicle Of Interest 1',
      dataIndex: 'vehicleNameOfInterest1',
      key: 'vehicleNameOfInterest1',
      sorter: (a, b) => a.vehicleNameOfInterest1.toLowerCase() < b.vehicleNameOfInterest1.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'vehicleNameOfInterest1' && sortedInfo.order,
    },
    {
      title: 'vehicle Of Interest 2',
      dataIndex: 'vehicleNameOfInterest2',
      key: 'vehicleNameOfInterest2',
      sorter: (a, b) => a.vehicleNameOfInterest2.toLowerCase() < b.vehicleNameOfInterest2.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'vehicleNameOfInterest2' && sortedInfo.order,
    },
    {
      title: 'vehicle Of Interest 3',
      dataIndex: 'vehicleNameOfInterest3',
      key: 'vehicleNameOfInterest3',
      sorter: (a, b) => a.vehicleNameOfInterest3.toLowerCase() < b.vehicleNameOfInterest3.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'vehicleNameOfInterest3' && sortedInfo.order,
    },
    {
      title: 'request Model Name',
      dataIndex: 'requestModelName',
      key: 'requestModelName',
      sorter: (a, b) => a.requestModelName.toLowerCase() < b.requestModelName.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'request Model Version',
      dataIndex: 'requestModelVersion',
      key: 'requestModelVersion',
      sorter: (a, b) => a.requestModelVersion.toLowerCase() < b.requestModelVersion.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestModelVersion' && sortedInfo.order,
    },
    {
      title: 'request Model ColorExt',
      dataIndex: 'requestModelColorExt',
      key: 'requestModelColorExt',
      sorter: (a, b) => a.requestModelColorExt.toLowerCase() < b.requestModelColorExt.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestModelColorExt' && sortedInfo.order,
    },
    {
      title: 'request Model Color Int',
      dataIndex: 'requestModelColorInt',
      key: 'requestModelColorInt',
      sorter: (a, b) => a.requestModelColorInt.toLowerCase() < b.requestModelColorInt.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestModelColorInt' && sortedInfo.order,
    },
    {
      title: 'request Model Option',
      dataIndex: 'requestModelOption',
      key: 'requestModelOption',
      sorter: (a, b) => a.requestModelOption.toLowerCase() < b.requestModelOption.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestModelOption' && sortedInfo.order,
    },
    {
      title: 'request Dealer Code',
      dataIndex: 'requestDealerCode',
      key: 'emrequestDealerCodeail',
      sorter: (a, b) => a.requestDealerCode.toLowerCase() < b.requestDealerCode.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestDealerCode' && sortedInfo.order,
    },
    {
      title: 'request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => a.requestDate.toLowerCase() < b.requestDate.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'requestDate' && sortedInfo.order,
    },
    {
      title: 'comment',
      dataIndex: 'comment',
      key: 'comment',
      sorter: (a, b) => a.comment.toLowerCase() < b.comment.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'comment' && sortedInfo.order,
    },

    
  ];
 

    useEffect(() => {       
           getLeadsCrm().then((data) => {                  
                setSortedInfo(sortedInfo || {});
                setFilteredInfo(filteredInfo || {});
                if(data){
                    setElements(data);
                    setTotalRegister(data.length);
                }                
            });
    }, [filteredInfo,sortedInfo])    
    

    return (        
    <>
        {
            elements &&(
                <>
                <Title level={ 2 }>Leads CRM</Title>
                <Divider />
                 <Row>
                    <Col  align="center">
                            <Space style={{ marginBottom: 16 }}>
                                <ExportLeadDataCSV csvData={elements} fileName={"Leads"} total={totalRegister}/>
                                <Button onClick={clearFilters}>Clear filters</Button>
                                <Button onClick={clearAll}>Clear filters and sorters</Button>
                            </Space>
                            <Table rowKey={elements => elements.leadID} columns={columns} dataSource={elements} onChange={handleChange} scroll={{ x: 1300 }} />  
                    </Col>
                </Row>
                </>
            )
        }
    </>
    )
}
