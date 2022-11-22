// import logo from '../logo.svg';
import '../styles/topbar.css'
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { isTokenExpired, renewToken } from '../renewToken/token';


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
        .then(()=>{
          console.log("Testing 2",state.email)
          const accessToken=JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
          // console.log("Acess",accessToken)
          // const accessToken = "eyJ4NXQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZdyIsImtpZCI6Ik1XUTVOV1V3WVdaaU1tTXpaVEl6TXpkbU16QmhNV000WWpReU1qVmhOV000Tmpoa01HUm1OekZsTUdJM1pEbG1ZbVF6Tm1FeU16aGhZakJpTm1aaFl3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2Yzk4YjA0Zi02MjYyLTRlNDQtYjMwMy1mOGZiNTM5MzBjNmEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsIm5iZiI6MTY2OTAyNzA3OCwiYXpwIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsInNjb3BlIjoiZGVmYXVsdCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NjkwMzA2NzgsImlkcF9jbGFpbXMiOnsibmFtZSI6IkhhYXRoaW0gTXVuYXMiLCJlbWFpbCI6ImhhYXRoaW1tdW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjY5MDI3MDc4LCJqdGkiOiJiYTEzOTcxNy0zMGVhLTQxNWUtOGMyZC0yNDYzOGE1NWQ0OGQifQ.bUPUggz7VDKQ39Hqe65Rp4yuTFOvkDvo4QZeCb86nMr84xgabdKeU47rPjV8t8qGgyeEEn3ltLBSFXz0UKzA0NZyTqPl55kp-nBWftQmL4_k5sCBY3Vr7igNB2Z2RVfEGveaev4-UkyVLc0u0NjO5_tjUG8QZqs1_Tf71O98uNArSkURKw4QJhLsucFo-21nTqYghBBj7gPBTZ0MNgdSEkCi37pU6DN1w4fVZxCrzyjkRtdJmcCWbs07HMNXnLjDLkXzQbCQh0hwmB84WYBVPKFFG3NxR5moEN5m6rCLg7Wd4tZe3a2xn2B-npj_KV-iBnAkeNox9dwh7RFsuBBKn0xN2KvfmtqWpX42m0iF6AOtnb8h71xXeM0zWp8SlikANOKnjWc425VPkMKIqqtGa35u9PZ-6N-igaZw16OMaC_cDvzWvKQgqetMGmh8lpmg5PBFhlOqQfao2rbmjpuwWHJ94gGZu5s2MV1FoRwP2A8AL03DD78jBjeHmVv6U46aVBH2qk7bqlqKqMRUIktdHOmEl5_dnMlx3HZBHErWGtyw6LyAtPmWi_rp-6WpFZauGjkvOfdHzfM5jPYEGDG1_mrInHOT-TZftnIpnvpwumrHNTSUyawJzzWun9ge_RriUbmNYDmtJHRXoAzVITDD1XQ7RC5SrpvpPzOLFBP1gaY"
          if(isTokenExpired()){
            console.log("Token is expired")
          }
          else{
            console.log("Token is good")
          }
          axios.post('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/addRecord',{ "userId": 111,
           "nic": "testing user 111",
           "name": "user 111"}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          })
        })
        .then((response) => {
          console.log(response)
        })
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
