import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      user: {}
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.json())
    .then(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result))
        this.setState({
          user: result
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Profile user={this.state.user} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/reports">Reports</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0, backgroundColor: "#FFF" }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route path="/reports">
                    <Reports />
                  </Route>
                  <Route path="/">
                    <Dashboard />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Faizal 2021</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div className="user">
        <div className="user__image"></div>
        <div className="user__name">{this.props.user.name}</div>
        <div className="user__username">@{this.props.user.username}</div>
        <div className="user__email">{this.props.user.email}</div>
      </div>
    );
  }
}

export class Dashboard extends Component {
  render() {
    return <h2>Dashboard</h2>;
  }
}

export class Reports extends Component {
  render() {
    return <h2>Reports</h2>;
  }
}