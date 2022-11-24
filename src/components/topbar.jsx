// import logo from '../logo.svg';
import '../styles/topbar.css'
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkTokenAndRenew, isTokenExpired, renewToken } from '../renewToken/token';
import { useHistory } from 'react-router-dom';


export default function TopBar() {

  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    on
  } = useAuthContext();

  const [derivedAuthenticationState, setDerivedAuthenticationState] = useState(null);
  let history = useHistory();

  useEffect(() => {

    if (!state?.isAuthenticated) {
      return;
    }

    // if(!localStorage.getItem('state')){
    //   const history = useHistory();
    //   history.push('/');
    // }

    (async () => {
      const basicUserInfo = await getBasicUserInfo();
      const idToken = await getIDToken();
      const decodedIDToken = await getDecodedIDToken();

      const derivedState = {
        authenticateResponse: basicUserInfo,
        idToken: idToken.split("."),
        decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
        decodedIDTokenPayload: decodedIDToken
      };

      console.log(state);
      console.log(derivedState);
      localStorage.setItem("state", state.isAuthenticated)
      console.log("+++++")
      console.log(idToken.split(".")[0] + idToken.split(".")[1] + idToken.split(".")[2])
      console.log("+++++")
      console.log(idToken)

      setDerivedAuthenticationState(derivedState);

      // Exhange idToken for API token using STS in Choreo
      fetch("https://sts.choreo.dev/oauth2/token", {
        body: "grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=" + idToken + "&subject_token_type=urn:ietf:params:oauth:token-type:jwt&requested_token_type=urn:ietf:params:oauth:token-type:jwt",
        headers: {
          Authorization: "Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .then((response) => response.json())
        .then((resJson) => localStorage.setItem("API_TOKEN", JSON.stringify(resJson)))
        // .then(()=>
        //   checkTokenAndRenew()
        // )
        // .then(() => {
        //   const accessToken=JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
        //   return axios.post('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/addRecord',
        //   { "userId": 987,
        //     "nic": "testing user 987",
        //     "name": "user 987"}, 
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${accessToken}`,
        //     }
        //   })
        //   return "MSG"
        // })
        // .then((response) => {
        //   console.log(response)
        // })
        // .catch((err) => {console.log("acess token failed!!");console.log(err)})
        
        .then(() =>
          fetch("https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/gatewayapiv2/1.0.0/checkStatus?middleNic=199933210059", {
            headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("API_TOKEN")).access_token
            },
            method: "GET",
          })
        )
        .then((response) => response.json())
        .then((response) => console.log(response))
          
          
        // .catch((err) => {console.log("An error has occurred ...."); console.log(err);})
  



    })();
  }, [state.isAuthenticated]);
  const imageStyle={
    width:'200px',
    heigh:'300px',
    
  }
  return (
    <div className='topBar'>
      <div className='topLeft'>

        <img src='/logo1.png' style={imageStyle} />

      </div>
      <div className="topRight">
        <ul className='topList'>
          {
            state.isAuthenticated
              ? (
                <div>
                  <ul>
                    <li><span>{state.email}</span><span><button onClick={() => { localStorage.removeItem("API_TOKEN"); localStorage.removeItem("state"); signOut(); }}>Logout</button></span></li>
                  </ul>

                
                </div>
              )
              : <button onClick={() => { signIn().then(res => console.log(res)) }} className='loginbutoon'>Login</button>
          }

          {/* <li><a href="#">Sign In</a></li> */}
        </ul>
      </div>
    </div>
  );
}


