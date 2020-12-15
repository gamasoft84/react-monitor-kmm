import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  BarChartOutlined,
  CloudDownloadOutlined,
  DollarCircleOutlined 
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import { Leads } from './Leads';
import { Quotations } from './Quotations';
import { TestsDrives } from './TestsDrives';
import { Events } from './Events';
import { ReportPrice } from './ReportPrice';

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
                            <Menu.Item key="1"><Link to="/leads">Leads</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/quotations">Quotations</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/testsDrives">Test Drive</Link></Menu.Item>                          
                          </SubMenu>
                          <Menu.Item key="4" icon={<CloudDownloadOutlined />}>
                              <Link to="/events">Events</Link>
                          </Menu.Item>
                        <Menu.Item key="5" icon={<DollarCircleOutlined  />}>
                          <Link to="/prices">
                            Prices
                          </Link>
                        </Menu.Item>
                        </Menu>
                      </Sider>
                      <Content style={{ padding: '0 24px', minHeight: 680 }}>
                        <Switch>
                          <Route path="/leads" component={ Leads } />
                          <Route path="/quotations" component={ Quotations } />
                          <Route path="/testsDrives" component={ TestsDrives } />
                          <Route path="/events" component={ Events } />
                          <Route path="/prices" component={ ReportPrice } />
                          <Redirect to="/leads" />
                        </Switch>
                      </Content>
                    </Layout>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}> Design ©2020 Created by Gamasoft</Footer>
                </Layout>
        </Router>
    )
}
