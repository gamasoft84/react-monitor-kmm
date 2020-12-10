import React, { useContext } from 'react';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileTextFilled,
  CarFilled,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import { UiContext } from '../context/UiContext';
import { Leads } from './Leads';
import { Quotations } from './Quotations';
import { TestsDrives } from './TestsDrives';
import { Events } from './Events';


const { Sider, Content } = Layout;


export const RouterPageKMM = () => {

    const { ocultarMenu } = useContext( UiContext )

    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
              <Sider collapsedWidth="0"
                     breakpoint="md"
                     hidden={ ocultarMenu }>
              <div className="logo" />
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                      <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/leads">
                          Leads
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2" icon={<FileTextFilled />}>
                        <Link to="/quotations">
                          Quotations
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="3" icon={<CarFilled />}>
                        <Link to="/testsDrives">
                          Test Drive
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="4" icon={<CarFilled />}>
                        <Link to="/events">
                          Events
                        </Link>
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Layout className="site-layout">

                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 36px',
                    padding: 24,
                    minHeight: 1000  
                  }}
                >
                  <Switch>
                   <Route path="/leads" component={ Leads } />
                   <Route path="/quotations" component={ Quotations } />
                   <Route path="/testsDrives" component={ TestsDrives } />
                   <Route path="/events" component={ Events } />
                   <Redirect to="/leads" />
                  </Switch>
                 
                </Content>
              </Layout>
          </Layout>
        </Router>
    )
}
