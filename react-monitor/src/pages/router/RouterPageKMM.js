import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  BarChartOutlined,
  CloudDownloadOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  UserOutlined,
  ApiOutlined
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import { Leads } from '../Leads';
import { Quotations } from '../Quotations';
import { TestsDrives } from '../TestsDrives';
import { Events } from '../eventsmk/Events';
import { ReportPrice } from '../reports/ReportPrice';
import { ReportPdvs } from '../reports/ReportPdvs';
import SummaryByDay from '../summary/SummaryByDay';
import { LeadsCrm } from '../leadscrm/LeadsCrm';
import VehicleOfInterest from '../leadscrm/VehicleOfInterest';
import TimeFramePurcharse from '../leadscrm/TimeFramePurcharse';
import LeadType from '../leadscrm/LeadType';
import { SendData } from '../apigateway/SendData';
import { ReportErrorsByDay } from '../reports/ReportErrorsByDay';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


export const RouterPageKMM = () => {

    return (
        <Router>
               <Layout>
                  <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                      <Menu.Item key="1"><Link to="/leads">Leads</Link></Menu.Item>
                      <Menu.Item key="2"><Link to="/events">Events</Link></Menu.Item>
                      <Menu.Item key="3"><Link to="/prices">Prices</Link></Menu.Item>
                    </Menu>
                  </Header>
                  <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                      <Sider className="site-layout-background" width={200}>
                        <Menu
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{ height: '100%' }}
                        >
                          <SubMenu key="sub1" icon={<BarChartOutlined />} title="Graphs">
                            <Menu.Item key="0"><Link to="/summaryByDay">Summary By Day</Link></Menu.Item>
                            <Menu.Item key="14"><Link to="/errorsByDay">Errors By Day</Link></Menu.Item>
                            <Menu.Item key="1"><Link to="/leads">Leads</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/quotations">Quotations</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/drivetests">Test Drive</Link></Menu.Item>                          
                          </SubMenu>
                          <Menu.Item key="4" icon={<CloudDownloadOutlined />}>
                              <Link to="/events">Events</Link>
                          </Menu.Item>
                          <Menu.Item key="5" icon={<DollarCircleOutlined  />}>
                            <Link to="/prices">
                              Prices
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="6" icon={<HomeOutlined  />}>
                            <Link to="/pdvs">PDVS</Link>
                          </Menu.Item>                         
                          <SubMenu key="menuCrm" icon={<UserOutlined  />} title="CRM">
                                <Menu.Item key="7"><Link to="/leadsCrm">Leads</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/leadsType">Lead Type</Link></Menu.Item>                          
                                <Menu.Item key="9"><Link to="/timeFrame">Time Frame</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/vehicleOfInterest">Vehicles of interest</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="menuApiGateway" icon={<ApiOutlined />} title="API GATEWAY">
                                <Menu.Item key="11"><Link to="/events">Top 10 Request</Link></Menu.Item>
                                <Menu.Item key="12"><Link to="/leadsCrm">Request by Date</Link></Menu.Item>
                                <Menu.Item key="13"><Link to="/apigategay/sendata">Send Data</Link></Menu.Item>

                            </SubMenu>
                        </Menu>
                      </Sider>
                      <Content style={{ padding: '0 24px', minHeight: 680 }}>
                        <Switch>
                          <Route path="/leads" component={ Leads } />
                          <Route path="/quotations" component={ Quotations } />
                          <Route path="/drivetests" component={ TestsDrives } />
                          <Route path="/events" component={ Events } />
                          <Route path="/prices" component={ ReportPrice } />
                          <Route path="/pdvs" component={ ReportPdvs} />
                          <Route path="/leadsCrm" component={ LeadsCrm} />
                          <Route path="/summaryByDay" component={ SummaryByDay } />
                          <Route path="/vehicleOfInterest" component={ VehicleOfInterest } />
                          <Route path="/timeFrame" component={ TimeFramePurcharse } />
                          <Route path="/leadsType" component={ LeadType } />
                          <Route path="/apigategay/sendata" component={ SendData } />
                          <Route path="/errorsByDay" component={ ReportErrorsByDay} />
                          <Redirect to="/leads" />
                        </Switch>
                      </Content>
                    </Layout>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}> Design ©2021 Created by Gamasoft</Footer>
                </Layout>
        </Router>
    )
}
