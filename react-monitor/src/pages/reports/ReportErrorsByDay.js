import React, { useEffect, useState } from 'react';
import { getCountTotalErrorsByTypeKMM } from '../../helpers/getDataKMM';
import { ReloadOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Divider, Table, Space, Button, Tag } from 'antd';

const { Title, Text } = Typography;


export const ReportErrorsByDay = () => {

  const [elements, setElements] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [sortedInfo, setSortedInfo] = useState([]);



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
      title: 'Error',
      dataIndex: 'message',
      key: 'message',
      sorter: (a, b) => a.message.toLowerCase() < b.message.toLowerCase(),
      sortOrder: sortedInfo.columnKey === 'message' && sortedInfo.order,
    },
    {
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
      sorter: (a, b) => a.total - b.total,
      sortOrder: sortedInfo.columnKey === 'total' && sortedInfo.order,
    },
    {
      title: 'Type Error',
      dataIndex: 'critic',
      key: 'critic',
      sorter: (a, b) => a.critic - b.critic,
      sortOrder: sortedInfo.columnKey === 'critic' && sortedInfo.order,
      render: (text, record) => (
        <>
          <Tag color={text !== true ? 'green' : 'red'} key={text}>
            {text !== true ? 'Bussines Rule' : 'System'}
          </Tag>
        </>
      )
    },
    {
      title: 'Msg Allowed',
      dataIndex: 'totalMsgAllowed',
      key: 'totalMsgAllowed',
      sorter: (a, b) => a.totalMsgAllowed - b.totalMsgAllowed,
      sortOrder: sortedInfo.columnKey === 'totalMsgAllowed' && sortedInfo.order
    }
  ];

  const handleRefresh = () => {
    updateData();
  }


  useEffect(() => {
    updateData()
  }, [])


  const updateData = () => {
    getCountTotalErrorsByTypeKMM().then((data) => {
      console.log(data);
      setSortedInfo(sortedInfo || {});
      setFilteredInfo(filteredInfo || {});
      setElements(data);
    });
  }


  return (
    <>
      {
        elements && (
          <>
            <Row type="flex">
              <Col flex={1}>
                <Title level={2}>Monitor</Title>
              </Col>
              <Col flex={{ grow: 1, shrink: 1, basis: '50%' }}>
                <Button
                  shape="round"
                  onClick={handleRefresh}>
                  <ReloadOutlined />
                        Update
                    </Button>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col align="center">
                <Space style={{ marginBottom: 16 }}>
                  <Button onClick={clearFilters}>Clear filters</Button>
                  <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
                <Table rowKey={elements => elements.message} columns={columns} dataSource={elements} onChange={handleChange} />
              </Col>
            </Row>
          </>
        )
      }
    </>
  )
}
