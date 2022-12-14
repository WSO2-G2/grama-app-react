import './styles/App.css';
import Home from './pages/home';
import Options from './pages/options';
import Apply from './pages/apply';
import Status from './pages/status';
import NIC from './pages/nic';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import Help from './pages/help';
// import { SecureRoute } from '@asgardeo/auth-react/dist/src';

function App() {

  return (
    <>
    <Router>
    <Switch>
        <Route exact path="/"> <Home/> </Route>
        <Route path="/options"> <Options/> </Route>
        <Route path="/apply"> <Apply/> </Route>
        <Route path="/status/:appId"> <Status/> </Route>
        <Route path="/nic"> <NIC/> </Route>
        <Route path="/help"> <Help/> </Route>
        
        {/* <SecureRoute path={ "/help" } component={ <Help /> } callback={ ()=>console.log("CALLBACK") } /> */}


      </Switch>
    </Router>
    </>
  );
}

export default App;
