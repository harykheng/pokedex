import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.scss'

const Layout = (props) => {
  return(
    <Router>
      <div>
        <div className="layout-header">
          <div>
            <img className="logo" src={logo} alt="" />
          </div>
          <Link className="btn-nav" to="/">Home</Link>
          <Link className="btn-nav">Compare</Link>
        </div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {props.routes.map((route,index) => (
            <Route exact key={`layout-${index}`} path={route.path} component={route.component}/>
          ))}
        </Switch>
      </div>
    </Router>
  )
}

export default Layout;