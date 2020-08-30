import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../utils/localStorage';
import Router from '../../routes';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home = () => {
  const history = useHistory();
  let { path } = useRouteMatch();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      history.push('/');
    }
  }, [history]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  const handleAbout = () => {
    history.push('/home/about');
  };
  return (
    <Layout>
      <Header className="header"></Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ height: '150vh' }}
        >
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <SubMenu
              key="sub1"
              icon={<NotificationOutlined />}
              title="CHỨC NĂNG"
            >
              <Menu.Item key="1">
                <Link to={`${path}/category`}>Danh mục</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`${path}/product`}>Sản Phẩm</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={`${path}/order`}>Order</Link>
              </Menu.Item>
              {/* <Menu.Item key="4">
                <Link to={`${path}/order`}>Đơn đặt hàng</Link>
              </Menu.Item> */}
            </SubMenu>

            <SubMenu key="sub2" icon={<UserOutlined />} title="USER">
              <Menu.Item key="6" onClick={handleLogOut}>
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Router></Router>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
