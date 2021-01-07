import React, { useEffect, useState } from "react";
import { Divider, Typography, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BarChartHook from '../components/charts/BarChartHook';
import TreeMapHook from '../components/charts/TreeMapHook';
import { getDataKMM } from "../helpers/getDataKMM";
const { Title } = Typography;


export const Leads = () => {

    const [data, setData] = useState();
    const type = "Leads";
    useEffect(() => {
        getDataByTypeElementKMM(type);
    }, [])


    const getDataByTypeElementKMM = (type) => {
        getDataKMM(type).then((data) => {
            setData(data);
            console.log(`getDataKMM ${type}`, data.length);
        });
    }

    const handleRefresh = () => {
        getDataByTypeElementKMM(type);
    }


    return (
        <div>
            <Row type="flex">
                <Col flex={1}>
                    <Title level={2}>Leads</Title>
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
            <BarChartHook title={type} data={data} />
            <Divider />
            <TreeMapHook title={type} data={data} />
        </div>
    )
}
