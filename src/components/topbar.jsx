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

// curl "https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/gatewayapiv2/1.0.0/checkStatus?middleNic=199933210059" -H 'Authorization: Bearer eyJ4NXQiOiJZVEJpWlRrME5URXdNMkV4WkdSaE1qUTNPVFl5TW1NMk5tSXhabU01WmpKaVptWTROVEkxTURkbVlUZ3pNell5WlRJek1tWm1NVE5oTmpJNFpqUmlOdyIsImtpZCI6IllUQmlaVGswTlRFd00yRXhaR1JoTWpRM09UWXlNbU0yTm1JeFptTTVaakppWm1ZNE5USTFNRGRtWVRnek16WXlaVEl6TW1abU1UTmhOakk0WmpSaU53X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJmMDViZWRlZjZhYzg0MDg1NmExMDM3MTVkZTAzNzg2YjQzYWQzNzBiY2NmMTU1YmJkYWU3NDViODcyM2MyMzFlIiwiYXRfaGFzaCI6ImVnRWtjUFF0Ynhoc3NDMWJoS1JTb3ciLCJzdWIiOiI2Yzk4YjA0Zi02MjYyLTRlNDQtYjMwMy1mOGZiNTM5MzBjNmEiLCJhbXIiOlsiR29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2FwaS5hc2dhcmRlby5pb1wvdFwvd3NvMmdyYW1hXC9vYXV0aDJcL3Rva2VuIiwic2lkIjoiMzg4ZWNjYzAtYTkwYy00NGQ5LThiZjctN2IxNGQ1NDQ2MGYyIiwiYXVkIjpbIkNKdWZkeUt4VERyU1hmQ0czUklnYTZPOUN0UWEiLCJodHRwczpcL1wvc3RzLmNob3Jlby5kZXZcL29hdXRoMlwvdG9rZW4iXSwiY19oYXNoIjoiamZ4ekhNNDZIRVNnYkdSMXZQVzNmUSIsIm5iZiI6MTY2OTI2Mjk4NCwiYXpwIjoiQ0p1ZmR5S3hURHJTWGZDRzNSSWdhNk85Q3RRYSIsIm9yZ19pZCI6IjY2MTcyYmNlLTVjZmMtNDVhMy1iNzcxLWFiYjEwYmIwNDI3YSIsIm5hbWUiOiJIYWF0aGltIE11bmFzIiwiZXhwIjoxNjY5MjY2NTg0LCJvcmdfbmFtZSI6IndzbzJncmFtYSIsImlhdCI6MTY2OTI2Mjk4NCwianRpIjoiZTE3YTJkZmItZjQ3NC00YjdjLTg4ZGUtZDRkNDAzYWE1MjU4IiwiZW1haWwiOiJoYWF0aGltbXVuYXNAZ21haWwuY29tIn0.ghKo3LNcxPLUksCCgFkF8gwNn5WJ_faqgT2FHA4X6ILW0-n5Yrcp_f0yCpYB6Y4tRN5lHwVWH20J2Pv51X04Ub722CBVWyLVSpyOQyALxHiN8lvt-pcvZL7_BXD1-KMrTT5ty-qVj07fyfZMVfKI4kwHNPFR0oXl4MArYor0ZrJ1fOWAypjM-y5HiXSJwJqFI5fRRI4Bpje21uc-dPWicOvDVdhFEp7oWFdelFfvQKK-aE8Kk9U9w5i5KLSvP0VH2FjAy61qLdNoDtQTSVZzfBsjdMqC4OK_nhHp476VhsA7sjKga9oFbmOCZZrqVo1Gt_hVykWisqj1uQdjkaEkkw' -X GET



// curl "https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/addresscheck/1.0.0/addressCheck?nic=199933210059" -H 'Authorization: Bearer eyJ4NXQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZdyIsImtpZCI6Ik1XUTVOV1V3WVdaaU1tTXpaVEl6TXpkbU16QmhNV000WWpReU1qVmhOV000Tmpoa01HUm1OekZsTUdJM1pEbG1ZbVF6Tm1FeU16aGhZakJpTm1aaFl3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2Yzk4YjA0Zi02MjYyLTRlNDQtYjMwMy1mOGZiNTM5MzBjNmEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsIm5iZiI6MTY2OTI2NjMxNiwiYXpwIjoiVmhnbjEzMXI4Y0lnRjNTeGFlYlFzdnZJMnlBYSIsInNjb3BlIjoiZGVmYXVsdCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NjkyNjk5MTYsImlkcF9jbGFpbXMiOnsibmFtZSI6IkhhYXRoaW0gTXVuYXMiLCJlbWFpbCI6ImhhYXRoaW1tdW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjY5MjY2MzE2LCJqdGkiOiI1Mjg2OTdkYy1hMDM0LTQyN2YtODlkNS02NmUxYzFlM2Q0OWQifQ.IG1RqsNgnTBxniu_-BzfaQNwvzDWayJygqB6f3OR2RxakP22K2ItaHWZVQpPkNIR9d3vD2NFM7ZGNY8E4DT2H1VoG-lC6MD-6kYVsRJEYxsW3MhC78sUqwiNCIAnqKM7jYVPOjx6heaXxgd10zUKOLONn1mNB39MMMkRJWco_wrtwpJgSmwP_HFYZbpLjmz4cKrL5qB7DClCpkurTIyON7qWKCXo8yZXSfkXFtqbrbHdpwNu9mfgaYY_mp11gxi3xa9MnE8NeHCDWmq3OB4Ul3_9gDoNvJt3OOw2bai3s4VogHM8InLZRtyqfZ0-3FXNEBUcv9guObCgvVhihW6taq68zjQ3GarABgnaBBVEUk2lKbDyIzplqA9h7k6J4GrpNEIfggyeQ0ALCCXrmVKBx2QLz_RL7qSNktCf_4czOMGH2_Ry_ECH-3yqQK92SiH2XfLT-aZ1WkAdo1IRz0Hp7qypDu04kWfKSFYufQDhGgZr04u5uIYaxm0phEICEDADiayu-ovvtMaXc5-h6E8pXq_5NSXqEi8L5g3O0Tjl1kR__PRzvUMYIc5x8JH_5JdkCJgRvS0T6y64O6EAbhZGivHFELjPHl22wRXExfVTLcJIvEpDH9MXTxkNWSuo87crKixSlcltGqzO0zZr1MD6N2nK-RZ2BHl4PrJ0IGhUFn0' -X GET


// curl -X GET "https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/gatewayapiv2/1.0.0/checkStatus?middleNic=199933210059" -H  "accept: application/json" -H  "Authorization: Bearer eyJ4NXQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZdyIsImtpZCI6Ik1XUTVOV1V3WVdaaU1tTXpaVEl6TXpkbU16QmhNV000WWpReU1qVmhOV000Tmpoa01HUm1OekZsTUdJM1pEbG1ZbVF6Tm1FeU16aGhZakJpTm1aaFl3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2Yzk4YjA0Zi02MjYyLTRlNDQtYjMwMy1mOGZiNTM5MzBjNmEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoibUd5MjZoclV4eEpObkQwZnRiY0RBOG1nbUtZYSIsIm5iZiI6MTY2OTI2NjYyNiwiYXpwIjoibUd5MjZoclV4eEpObkQwZnRiY0RBOG1nbUtZYSIsInNjb3BlIjoiZGVmYXVsdCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NjkyNzAyMjYsImlkcF9jbGFpbXMiOnsibmFtZSI6IkhhYXRoaW0gTXVuYXMiLCJlbWFpbCI6ImhhYXRoaW1tdW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjY5MjY2NjI2LCJqdGkiOiI1ZWFiMWNkYi0zMzcyLTQyMDQtOTU1NC1jOGNlMjk4YmM2OTIifQ.CSVGdYVoqUS5MR1VxAM3ln9QyRGQtqYFOvu6k2DgORI4GfZiVMpPS7e5lPe4sxPT1Mt0k-cBahabTXZAaP22d-D7zQM66gr7Q0XZKrqY-mZlag29hSstSNWjAvq4r-liLVi1AT85XBOWxHJNscChdGfu2Uo7uVeyX0cNXOEJecUBKrjL-CXEqZB3V1IVhnXT6yamAI--9BqdVg2CimNclN6OXD9jXXGJJjiHq0OZPGcqrRwngcmBhq3qRBdQr22t91wnwkgOJN3_y76BaxA0e-fMlbf8GBNJb6LP8WzAFbnTAdijgn7kEBeL5nnNFaZfmIBdKGRr5XJiEi1BlhBIANAjRY7k7KGEXvJ9CzsHDY_t4BZAdmdK7kpDQHgdGZfw_NEupdJqHqQlB6zx_afkeOukq1P9n3djk9QbRFtjwgHEiwBfSpaiMQE7USFTWjydK8zBJbMARMd2FyzMKvZB1Yet9H1YURUY49ec-g-mkTmEH0Y8_rdsb-EmAIFTgsJfN3zpos6CVspl_zyKRQeomme7sNO1pt2ESS8z4-OfLwrAWNL-iX9OWW_iAelJaJVYhzGvh99TX07BqpLKc_Q4Ve0MLea4yph02Pbo2QFyEn9TIK2H_pi_Ybg6kAOtzqZqu07H27A9tvqIv0NULEDQTWTzSE26mfY9k54xRKV_gPE"