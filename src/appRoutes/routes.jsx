import { SecureRoute } from '@asgardeo/auth-react/dist/src'
import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Apply from '../pages/apply'
import Help from '../pages/help'
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
            {/* <SecureRoute path={ "/help" } component={ <Help /> } callback={ callback } /> */}
            <Route path={ "/help" } component={ <Help /> } />

            
        </Switch>
    
    </BrowserRouter>
  )
}

export default routes