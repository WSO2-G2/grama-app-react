import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useLocation, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Loader, Steps } from 'rsuite';

import axios from 'axios';
import SideNIC from '../components/sideNIC';
import { useAuthContext } from "@asgardeo/auth-react";
import { checkTokenAndRenew } from '../renewToken/token';


export default function NIC(props) {
  const MySwal = withReactContent(Swal)
  let history = useHistory();
  const [nic, setNic] = useState('');
  const [statestep, setState] = useState(0)
  const [redirect, setRedirect] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('pending')
  const [addressCheck, setAddressCheck] = useState('pending')
  const [email, setEmail] = useState('')

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

  const [idCheckStatus, setIdCheckStatus] = useState('')
  const [policeCheckStatus, setPoliceCheckStatus] = useState('')

  const submitID = () => {

    var newid = nic.toString();
    localStorage.setItem('nic', newid)
    console.log("Testing 2", state.email)
    const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
    setIdCheckStatus('pending')
    axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/gramaconnect/1.0.0/requestavailable', {
      params: {
        'nic': `${newid}`
      },

      headers: {
        'Authorization': `Bearer ${accessToken}`,

      }
    }).then((response) => {
      console.log(response.data)

      if (response.data) {
        Swal.fire({
          icon: 'error',
          title: 'You have a pending request',
          text: 'Please check the request status from the main menu',
        }).then(() => {
          window.location.href = "/options"
        })

      }
      else {
        axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId', {
          params: {
            'nic': `${newid}`
          },

          headers: {
            'Authorization': `Bearer ${accessToken}`,

          }



        }).then((response) => {
          console.log("ID Check", response.data.body)
          setIdCheckStatus('')
          if (response.data.body == 'true') {
            //if id check true check police
            setPoliceCheckStatus('pending')
            setState(1);
            axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/policeccheck/1.0.0/getalldetails', {
              params: {
                'nic': `${newid}`
              },

              headers: {
                'Authorization': `Bearer ${accessToken}`,

              }



            }).then((response) => {

              setPoliceCheckStatus('');
              if (response.data.body == 'true') {

                //if police check false
                console.log("Police check fails", response.data.body)
                setState(1)
                setCurrentStatus('error')
                setTimeout(() => {
                  history.push("/status/appId");
                  // return <Redirect to="/status/appId" />


                }, 3000);

              }
              else {
                console.log("Police check true", response.data.body)
                setRedirect(true);



                setState(2)

                setTimeout(() => {

                  history.push("/apply");


                }, 2000);


              }


            });


          }
          else {
            setCurrentStatus("error")
            setTimeout(() => {

            }, 3000);
            Swal.fire({
              icon: 'error',
              title: 'Unidentified Identity entered',
              text: 'You will be redirected to the options page',
            }).then(() => {
              window.location.href = "/options"
            })

          }

        })

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
            <button onClick={submitID} className='nicButton'>Next</button>
            {/* <Link onClick={submitID} className='nicBut' type='button'>Next</Link> */}

            <div className='stepsDiv'>
              <Steps current={statestep} currentStatus={currentStatus}>
                {/* <Steps.Item title="Identity Check" />
                <Steps.Item title="Police Check" className='steps' /> */}
                {(idCheckStatus === 'pending') ? <Steps.Item title="Identity Check" icon={<Loader />} /> :
                  <Steps.Item title="Identity Check" />}
                {(policeCheckStatus === 'pending') ? <Steps.Item title="Police Check" className='steps' icon={<Loader />} /> :
                  <Steps.Item title="Police Check" className='steps' />}
              </Steps>
            </div>

            <Link to={"/options"}>Back</Link>
          </div>

          <div className='contentOne'>
            <SideNIC />
          </div>
        </div>
      </div>
    </>
  );
}