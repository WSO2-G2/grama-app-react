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
            mode:"no-cors"
          })
        )
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
                    <li><span>{state.email}</span><span><button onClick={() => { localStorage.removeItem("API_TOKEN"); signOut(); }}>Logout</button></span></li>
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


  // curl -k -X POST https://sts.choreo.dev/oauth2/token -d "grant_type=refresh_token&refresh_token=2e045e3e-ddde-3381-8fd2-66efc0c691f5" -H "Authorization: Basic VmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYTppZDFTVmI5WW5XNG4xUzM5cUpLRUhpU08wX1Vh"

//   curl "https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/gatewayapi/1.0.0/checkStatus?middleNic=199933210059" -H 'API-Key: eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjZWJkNTk0My01NGU2LTRjZTAtYTk2OC01ZjgxM2FhN2FhZmJAY2FyYm9uLnN1cGVyIiwiaXNzIjoiaHR0cHM6XC9cL3N0cy5jaG9yZW8uZGV2OjQ0M1wvb2F1dGgyXC90b2tlbiIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJnYXRld2F5QVBJIiwiY29udGV4dCI6IlwvN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiXC9kZHJxXC9nYXRld2F5YXBpXC8xLjAuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTY2OTI0MDczMSwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNjY5MTgwNzMxLCJqdGkiOiIwYWE4MTljMy0wN2NkLTQwYjQtYWVmMC02YWFkYTI2MTA5YTgifQ.MYxI-0_zVo8AKomy6ay1_pcVBRlAwNjWC3jZw1rCxqzTJiIa8i3M9mH_mehdbLhESQHT15yPQRZJ2cxff_Uha-bCLiPVxwcZsWab9NZ4sUYc-t2gsSWGfWRME_8Zb4AtosepoUSxWtB02pH4g1uJDViQCWTiHITD3NMSiXF3xmTQ5Qx-eAIi4Us6O5uVAuuVzi79pEtA3xyBxUus3wp9aglPBnrSZ0MmM_qMjhSXiGtoDNbVJMygthgLK3qKH5RmhQRHxD88qnBX8VBRbDMQYrLv4P91bCUO8YByZhm1OJxnwHhrhvf34G0ZTvuE_6vDAuJWdmsR50_2jdpfePrXqvCpLBkGTM663bJtVSBjSkFsrFa7CA7wJsJkPL8_Kfz9lecQ3k3aIhHom6E8IfKknj_pLZMTlsMlBj1rM8gjrEEUgcUHVBS0mRlAwA43ilKUK3HIWgYx5P6SVSkzDdCWkvMW5HrodEhGv41qLnDtj9JvlGXa6_6b8Wd-rxpS_G6VdYkpDq4gSv_GfFM4MZjV2NVGGRqOx7BN7lOeD6TgnIiR5SPFA6_usEBoe8KG0oiCk6zlqBVN1-Q2pFrVWtMmCiL6TEkFtcciv-2cWLCIlyLZ0RnD1TkyBs2FtuiPP1XtxtLkWu2U1CRKPwRzuJOIRlfydmZW1_idQTKGxRye8Jk' -X GET

//   import gramaappproject/identitycheck_v2;
// import gramaappproject/policeccheck;
// import gramaappproject/addresscheck;
// // import gramaappproject/identitycheck;
// import ballerina/http;
// import ballerina/io;

// string consumerKey = "2RAJy49FbGmLycTPzendy9Xkv7Qa";
// string consumerSecret = "HgICyinmZb6fNqd6DrvTR8alxQwa";

// type checkStatusResponse record {
//     addresscheck:Status addressCheckResponse;
//     boolean policeCheckResponse;
// };

// # A service representing a network-accessible API
// # bound to port `9090`.
// service / on new http:Listener(9090) {

//     # A resource for generating greetings
//     # + middleNic - the input string name
//     # + return - string name with hello message or error
//     resource function get checkStatus(string middleNic) returns checkStatusResponse|error {
//         // Send a response back to the caller.

//         io:print("WELCOME TOM");
//         identitycheck_v2:Client identitycheck_v2Ep = check new (clientConfig = {
//             auth: {
//                 clientId: consumerKey,
//                 clientSecret: consumerSecret
//             }
//         });
//         addresscheck:Client addresscheckEp = check new (clientConfig = {
//             auth: {
//                 clientId: consumerKey,
//                 clientSecret: consumerSecret
//             }
//         });

//         policeccheck:Client policeccheckEp = check new (clientConfig = {
//             auth: {
//                 clientId: consumerKey,
//                 clientSecret: consumerSecret
//             }
//         });

//         addresscheck:Status getAddresscheckResponse = {status: "failed"};
//         boolean getGetalldetailsResponse = false;

//         if (true) {
//             getAddresscheckResponse = check addresscheckEp->getAddresscheck(nic = middleNic);
//             getGetalldetailsResponse = check policeccheckEp->getGetalldetails(nic = middleNic);
//         }

//         checkStatusResponse response = {addressCheckResponse: getAddresscheckResponse, policeCheckResponse: getGetalldetailsResponse};
//         return response;
//     }
// }