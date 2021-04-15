// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import DataPage from './pages/DataPage'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    // </header>
    // </div>
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