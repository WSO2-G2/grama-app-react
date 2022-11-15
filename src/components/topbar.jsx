// import logo from '../logo.svg';
import '../styles/topbar.css'
import { useAuthContext } from "@asgardeo/auth-react";


export default function TopBar() {

  const { state, signIn, signOut } = useAuthContext();

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
                <li>{state.username}</li>
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
