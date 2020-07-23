import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Сomponents/Layout/Navbar';
import AuthState from './Сomponents/Context/authContext/AuthState'
import PrivateRoute from './Сomponents/Pages/PrivateRoute'
import PrivateRouteLogs from './Сomponents/Pages/PrivateRouteLogs'
import FirstPage from './Сomponents/Pages/FirstPage'
import Search from './Сomponents/Pages/Search'
import Image from './Сomponents/Pages/Image'
import Logs from './Сomponents/Pages/Logs'
import Edit from './Сomponents/Pages/Edit'
import Alert from './Сomponents/Layout/Alert';
import FilterState from './Сomponents/Context/FilterState';
import Archive from './Сomponents/Pages/Archive';
import Fines from './Сomponents/Pages/Fines';
import Collation from './Сomponents/Pages/Collation';

function App() {
  return (
  <AuthState>
    <FilterState>
      <Router>
      <div className="App">
        <Navbar />
        <Alert />
        <div>
          <Switch>
            <PrivateRoute exact path="/search" component={Search}/>
            <PrivateRoute exact path="/image" component={Image}/>
            <PrivateRoute exact path="/edit" component={Edit}/>
            <PrivateRouteLogs exact path="/logs" component={Logs} type="admin"/>
            <PrivateRouteLogs exact path="/archive" component={Archive} type="washing"/>
            <PrivateRouteLogs exact path="/fines" component={Fines} type="washing"/>
            <PrivateRouteLogs exact path="/collation" component={Collation} type="washing"/>
            <Route exact path="/" component={FirstPage}/>
          </Switch>       
        </div>
      </div>
      </Router>
    </FilterState>
  </AuthState>
  );
}

export default App;
