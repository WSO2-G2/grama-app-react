// import logo from '../logo.svg';
import '../styles/topbar.css'
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkTokenAndRenew, isTokenExpired, renewToken } from '../renewToken/token';


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

  const [ derivedAuthenticationState, setDerivedAuthenticationState ] = useState(null);

  
  useEffect(() => {

    if (!state?.isAuthenticated) {
        return;
    }

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
        console.log("+++++")
        console.log(idToken.split(".")[0]+idToken.split(".")[1]+idToken.split(".")[2])
        console.log("+++++")
        console.log(idToken)

        setDerivedAuthenticationState(derivedState);

        // Exhange idToken for API token using STS in Choreo
        fetch("https://sts.choreo.dev/oauth2/token", {
          body: "grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token="+idToken+"&subject_token_type=urn:ietf:params:oauth:token-type:jwt&requested_token_type=urn:ietf:params:oauth:token-type:jwt",
          headers: {
            Authorization: "Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        })
        .then((response) => response.json())
        .then((resJson) => localStorage.setItem("API_TOKEN",JSON.stringify(resJson)))
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
        .catch((err) => {console.log("acess token failed!!");console.log(err)})
        
        // .then(() =>
        //   fetch("https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/addRecord", {
        //     headers: {
        //       Authorization: "Bearer " + JSON.parse(localStorage.getItem("API_TOKEN")).access_token
        //     },
        //     body: {
        //       "userId": 4,
        //       "nic": "123456789",
        //       "name": "Joe Biden"
        //     },
        //     method: "POST",
        //     mode:"no-cors"
        //   })
        // )S
        // .then((response) => console.log(response))
          
          
        // .catch((err) => {console.log("An error has occurred ...."); console.log(err);})
  



      })();
    }, [ state.isAuthenticated ]);

  return (
    <div className='topBar'>
      <div className='topLeft'>
        <h2>Grama App</h2>
      </div>
      <div className="topRight">
        <ul className='topList'>
        {
        state.isAuthenticated
          ? (
            <div>
              <ul>
                <li>{state.email}</li>
              </ul>

              <li><button onClick={() => {localStorage.removeItem("API_TOKEN");signOut();}}>Logout</button></li>
            </div>
          )
          : <li><button onClick={ () => {signIn().then(res=>console.log(res))} }>Login</button></li>
        }
          
          {/* <li><a href="#">Sign In</a></li> */}
        </ul>
      </div>
    </div>
  );
  }


  // curl -k -X POST https://sts.choreo.dev/oauth2/token -d "grant_type=refresh_token&refresh_token=2e045e3e-ddde-3381-8fd2-66efc0c691f5" -H "Authorization: Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh"