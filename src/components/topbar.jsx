// import logo from '../logo.svg';
import '../styles/topbar.css'
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from 'react';


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
        .then(() => {
          fetch("https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-dev.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId?nic=19993321005v", {
            headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("API_TOKEN")).access_token
            },
            method: "POST"
          })
        })
        .then((response) => console.log(response))
        .catch((err) => {console.log("An error has occurred ...."); console.log(err);})

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
          : <li><button onClick={ () => signIn() }>Login</button></li>
        }
          
          {/* <li><a href="#">Sign In</a></li> */}
        </ul>
      </div>
    </div>
  );
  }
