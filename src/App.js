import React from 'react';
import './App.css';
import Home from './views/Home'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Layout, LayoutPanel } from 'rc-easyui';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <Layout style={{ width: '100vw', height: '100vh' }}>
          <LayoutPanel region="north" style={{ height: '8vh' }}>
            <Header />
          </LayoutPanel>

          <LayoutPanel region="west" style={{ width: 200 }}>
            <Sidebar />
          </LayoutPanel>

          <LayoutPanel region="center" style={{ height: '100%', padding: '10px' }}>
            <Router>
              <Switch>
                <Route exact path='/home' component={Home}>
                </Route>
                <Route exact path='/xxx' component={Sidebar}>
                </Route>
                <Redirect exact from='/' to='/home' />
                <Route path='*'>
                  <div>12312</div>
                </Route>
              </Switch>
            </Router>
            <Home />
          </LayoutPanel>
        </Layout>
        {/* <Home /> */}
      </div>
    );
  }
}

export default App;
