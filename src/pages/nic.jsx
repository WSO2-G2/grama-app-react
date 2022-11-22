import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import { Loader, Steps } from 'rsuite';

import axios from 'axios';
import SideNIC from '../components/sideNIC';
import { useAuthContext } from "@asgardeo/auth-react";
import { checkTokenAndRenew } from '../renewToken/token';


export default function NIC(props) {
  const [nic, setNic] = useState('');
  const [statestep, setState] = useState(0)
  const [redirect, setRedirect] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('pending')
  const [addressCheck, setAddressCheck] = useState('pending')
  const [email,setEmail]=useState('')




  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    on
  } = useAuthContext();

  const changenic = (e) => {
    setNic(e.target.value)


    //console.log(nic)
  }

  const submitID = () => {

    var newid = nic.toString();
    localStorage.setItem('nic', newid)
    console.log("Testing 2", state.email)
    const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;


      axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId', {
      params: {
        'nic': `${newid}`
      },

      headers: {
        'Authorization': `Bearer ${accessToken}`,

      }



    }).then((response) => {
      console.log("ID Check", response.data.body)
      if (response.data.body == 'true') {
        //if id check true check police
        setState(1);
        axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/policeccheck/1.0.0/getalldetails', {
          params: {
            'nic': `${newid}`
          },

          headers: {
            'Authorization': `Bearer ${accessToken}`,

          }



        }).then((response) => {
          if (response.data.body == 'true') {

            //if police check false

            console.log("Police check fails",response.data.body )
            setState(1)
            setCurrentStatus('error')
            setTimeout(() => {
             
              return <Redirect to="/status/appId" />
              

            },1000);

          }
          else {
            console.log("Police check fails",response.data.body )
            setRedirect(true); 
            if (true) {
              return <Redirect to="/status/appId" />
              console.log("hhhh")
            }
           
            console.log("Mhhahaha")
            setState(2)
            console.log("Mhhahaha")
            setTimeout(() => {
              console.log("Hello")
              
              

            },1000);


          }


        });


      }
      else {
        setCurrentStatus("error")
        setTimeout(() => {
          return <Redirect to="/status/appId" />

        }, 2000);

      }

    })



  }
  return (
    <>
      <TopBar />
      <div className="home">
        <div className='content'>
          <div className='contentOne'>

            {/* <label for="fname" className='labelnic'>Please Enter your nic</label> */}
            <br></br>
            <input type="text" id="fname" name="fname" onChange={changenic} value={nic} className='nicInput' placeholder='Please Enter your nic' />
            <button onClick={submitID} className='nicBut'>Next</button>
            <div className='stepsDiv'>
              <Steps current={statestep} currentStatus={currentStatus}>
                <Steps.Item title="Identity Check" />
                <Steps.Item title="Police Check" className='steps' />
                {(addressCheck === 'pending') ? <Steps.Item title="Address Check" icon={<Loader />}/> : 
                  <Steps.Item title="Address Check" />}
              </Steps>
            </div>
          </div>

          <div className='contentOne'>
            <SideNIC />
          </div>
        </div>
      </div>
    </>
  );
}