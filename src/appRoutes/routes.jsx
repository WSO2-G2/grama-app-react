import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Apply from '../pages/apply'
import Home from '../pages/home'
import Options from '../pages/options'
import Status from '../pages/status'

function routes() {
  return (
    <BrowserRouter>

        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/options" component={Options} />
            <Route path="/status/appId" component={Status} />
            <Route path="/apply" component={Apply} />            
            
        </Switch>
    
    </BrowserRouter>
  )
}

export default routes