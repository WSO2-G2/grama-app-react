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
        console.log(idToken.split(".")[0]+idToken.split(".")[1]+idToken.split(".")[3])

        setDerivedAuthenticationState(derivedState);
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

              <li><button onClick={() => signOut()}>Logout</button></li>
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
