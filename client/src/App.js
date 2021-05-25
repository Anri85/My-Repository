import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Product from './components/product/Product'
import Join from './components/join/Join'
import Chat from './components/chat/Chat'

const App = () => {
    return(
        <Router>
            <Route path='/' exact component={Product} />
            <Route path='/login' component={Join} />
            <Route path='/chat' component={Chat} />
        </Router>
    )
}

export default App