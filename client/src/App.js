// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import DataPage from './pages/DataPage'

function App() {
  return (
    <React.Fragment>
      {/* membuat navbar */}
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path='/' component={DataPage}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;