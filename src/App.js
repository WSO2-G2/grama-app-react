import logo from './logo.svg';
import './styles/App.css';
import Home from './pages/home';
import Options from './pages/options';
import Apply from './pages/apply';
import Status from './pages/status';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
    <Switch>
        <Route exact path="/"> <Home/> </Route>
        <Route path="/options"> <Options/> </Route>
        <Route path="/apply"> <Apply/> </Route>
        <Route path="/status/:appId"> <Status/> </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
